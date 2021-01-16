import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { NodeComponent } from 'src/app/components/node/node.component';

// Source: https://blog.ng-book.com/dynamic-components-with-content-projection-in-angular/
export type Content<T> = string | TemplateRef<T> | Type<T> | HTMLElement;

@Injectable({
    providedIn: 'root'
})
export class ElementWrapperService {
    constructor(private resolver: ComponentFactoryResolver,
        @Inject(DOCUMENT) private document: Document,
        private injector: Injector) { }

    wrapElement(parent: HTMLElement, content: HTMLElement) {
        const factory = this.resolver.resolveComponentFactory(NodeComponent);
        const ngContent = this.resolveNgContent(content);
        const componentRef = factory.create(this.injector, ngContent);

        componentRef.hostView.detectChanges();
        const { nativeElement } = componentRef.location;
        parent.appendChild(nativeElement);

        (componentRef.instance as any).addContent(content);

        // parent.document.body.appendChild(nativeElement);
        // debugger;
    }

    resolveNgContent<T>(content: Content<T>) {
        if (content instanceof HTMLElement) {
            return [[content]];
        }
        if (typeof content === 'string') {
            const element = this.document.createTextNode(content);
            return [[element]];
        }

        // TODO
        // if (content instanceof TemplateRef) {
        //     const viewRef = content.createEmbeddedView(null);
        //     console.log(viewRef)
        //     // In earlier versions, you may need to add this line
        //     // this.appRef.attachView(viewRef);
        //     return [viewRef.rootNodes];
        // }

        const factory = this.resolver.resolveComponentFactory(content as Type<T>);
        const componentRef = factory.create(this.injector);
        return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
    }
}
