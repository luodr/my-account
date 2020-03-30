export class RouterArray {
    static decoratedRouters: Array<{ target: any, method: string, path: string, fun: Function}> = new Array()
}
export function router(method: string, path: string) { // 这是一个装饰器工厂
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // descriptor.enumerable = value;
        RouterArray.decoratedRouters.push({
            target,
            method,
            path,
            fun: target[propertyKey]
        });
    };
}
