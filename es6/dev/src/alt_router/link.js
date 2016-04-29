import { Tree, TreeNode, UrlSegment, rootNode } from './segments';
import { isBlank, isString, isStringMap } from 'angular2/src/facade/lang';
import { ListWrapper } from 'angular2/src/facade/collection';
export function link(segment, tree, change) {
    if (change.length === 0)
        return tree;
    let normalizedChange = (change.length === 1 && change[0] == "/") ? change : ["/"].concat(change);
    return new Tree(_update(rootNode(tree), normalizedChange));
}
function _update(node, changes) {
    let rest = changes.slice(1);
    let outlet = _outlet(changes);
    let segment = _segment(changes);
    if (isString(segment) && segment[0] == "/")
        segment = segment.substring(1);
    // reach the end of the tree => create new tree nodes.
    if (isBlank(node)) {
        let urlSegment = new UrlSegment(segment, null, outlet);
        let children = rest.length === 0 ? [] : [_update(null, rest)];
        return new TreeNode(urlSegment, children);
    }
    else if (outlet != node.value.outlet) {
        return node;
    }
    else {
        let urlSegment = isStringMap(segment) ? new UrlSegment(null, segment, null) :
            new UrlSegment(segment, null, outlet);
        if (rest.length === 0) {
            return new TreeNode(urlSegment, []);
        }
        return new TreeNode(urlSegment, _updateMany(ListWrapper.clone(node.children), rest));
    }
}
function _updateMany(nodes, changes) {
    let outlet = _outlet(changes);
    let nodesInRightOutlet = nodes.filter(c => c.value.outlet == outlet);
    if (nodesInRightOutlet.length > 0) {
        let nodeRightOutlet = nodesInRightOutlet[0]; // there can be only one
        nodes[nodes.indexOf(nodeRightOutlet)] = _update(nodeRightOutlet, changes);
    }
    else {
        nodes.push(_update(null, changes));
    }
    return nodes;
}
function _segment(changes) {
    if (!isString(changes[0]))
        return changes[0];
    let parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[1] : changes[0];
}
function _outlet(changes) {
    if (!isString(changes[0]))
        return null;
    let parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[0] : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtNVgzakRmb2QudG1wL2FuZ3VsYXIyL3NyYy9hbHRfcm91dGVyL2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBZ0IsUUFBUSxFQUFDLE1BQU0sWUFBWTtPQUN0RSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sMEJBQTBCO09BQ2hFLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDO0FBRTFELHFCQUFxQixPQUFxQixFQUFFLElBQXNCLEVBQzdDLE1BQWE7SUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBYSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQsaUJBQWlCLElBQTBCLEVBQUUsT0FBYztJQUN6RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJ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LE9BQWM7SUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHJlZSwgVHJlZU5vZGUsIFVybFNlZ21lbnQsIFJvdXRlU2VnbWVudCwgcm9vdE5vZGV9IGZyb20gJy4vc2VnbWVudHMnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1N0cmluZywgaXNTdHJpbmdNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gbGluayhzZWdtZW50OiBSb3V0ZVNlZ21lbnQsIHRyZWU6IFRyZWU8VXJsU2VnbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGFueVtdKTogVHJlZTxVcmxTZWdtZW50PiB7XG4gIGlmIChjaGFuZ2UubGVuZ3RoID09PSAwKSByZXR1cm4gdHJlZTtcbiAgbGV0IG5vcm1hbGl6ZWRDaGFuZ2UgPSAoY2hhbmdlLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VbMF0gPT0gXCIvXCIpID8gY2hhbmdlIDogW1wiL1wiXS5jb25jYXQoY2hhbmdlKTtcbiAgcmV0dXJuIG5ldyBUcmVlPFVybFNlZ21lbnQ+KF91cGRhdGUocm9vdE5vZGUodHJlZSksIG5vcm1hbGl6ZWRDaGFuZ2UpKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZShub2RlOiBUcmVlTm9kZTxVcmxTZWdtZW50PiwgY2hhbmdlczogYW55W10pOiBUcmVlTm9kZTxVcmxTZWdtZW50PiB7XG4gIGxldCByZXN0ID0gY2hhbmdlcy5zbGljZSgxKTtcbiAgbGV0IG91dGxldCA9IF9vdXRsZXQoY2hhbmdlcyk7XG4gIGxldCBzZWdtZW50ID0gX3NlZ21lbnQoY2hhbmdlcyk7XG4gIGlmIChpc1N0cmluZyhzZWdtZW50KSAmJiBzZWdtZW50WzBdID09IFwiL1wiKSBzZWdtZW50ID0gc2VnbWVudC5zdWJzdHJpbmcoMSk7XG5cbiAgLy8gcmVhY2ggdGhlIGVuZCBvZiB0aGUgdHJlZSA9PiBjcmVhdGUgbmV3IHRyZWUgbm9kZXMuXG4gIGlmIChpc0JsYW5rKG5vZGUpKSB7XG4gICAgbGV0IHVybFNlZ21lbnQgPSBuZXcgVXJsU2VnbWVudChzZWdtZW50LCBudWxsLCBvdXRsZXQpO1xuICAgIGxldCBjaGlsZHJlbiA9IHJlc3QubGVuZ3RoID09PSAwID8gW10gOiBbX3VwZGF0ZShudWxsLCByZXN0KV07XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxVcmxTZWdtZW50Pih1cmxTZWdtZW50LCBjaGlsZHJlbik7XG5cbiAgICAvLyBkaWZmZXJlbnQgb3V0bGV0ID0+IHByZXNlcnZlIHRoZSBzdWJ0cmVlXG4gIH0gZWxzZSBpZiAob3V0bGV0ICE9IG5vZGUudmFsdWUub3V0bGV0KSB7XG4gICAgcmV0dXJuIG5vZGU7XG5cbiAgICAvLyBzYW1lIG91dGxldCA9PiBtb2RpZnkgdGhlIHN1YnRyZWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgdXJsU2VnbWVudCA9IGlzU3RyaW5nTWFwKHNlZ21lbnQpID8gbmV3IFVybFNlZ21lbnQobnVsbCwgc2VnbWVudCwgbnVsbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVXJsU2VnbWVudChzZWdtZW50LCBudWxsLCBvdXRsZXQpO1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxVcmxTZWdtZW50Pih1cmxTZWdtZW50LCBbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxVcmxTZWdtZW50Pih1cmxTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZU1hbnkoTGlzdFdyYXBwZXIuY2xvbmUobm9kZS5jaGlsZHJlbiksIHJlc3QpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXBkYXRlTWFueShub2RlczogVHJlZU5vZGU8VXJsU2VnbWVudD5bXSwgY2hhbmdlczogYW55W10pOiBUcmVlTm9kZTxVcmxTZWdtZW50PltdIHtcbiAgbGV0IG91dGxldCA9IF9vdXRsZXQoY2hhbmdlcyk7XG4gIGxldCBub2Rlc0luUmlnaHRPdXRsZXQgPSBub2Rlcy5maWx0ZXIoYyA9PiBjLnZhbHVlLm91dGxldCA9PSBvdXRsZXQpO1xuICBpZiAobm9kZXNJblJpZ2h0T3V0bGV0Lmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbm9kZVJpZ2h0T3V0bGV0ID0gbm9kZXNJblJpZ2h0T3V0bGV0WzBdOyAgLy8gdGhlcmUgY2FuIGJlIG9ubHkgb25lXG4gICAgbm9kZXNbbm9kZXMuaW5kZXhPZihub2RlUmlnaHRPdXRsZXQpXSA9IF91cGRhdGUobm9kZVJpZ2h0T3V0bGV0LCBjaGFuZ2VzKTtcbiAgfSBlbHNlIHtcbiAgICBub2Rlcy5wdXNoKF91cGRhdGUobnVsbCwgY2hhbmdlcykpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufVxuXG5mdW5jdGlvbiBfc2VnbWVudChjaGFuZ2VzOiBhbnlbXSk6IGFueSB7XG4gIGlmICghaXNTdHJpbmcoY2hhbmdlc1swXSkpIHJldHVybiBjaGFuZ2VzWzBdO1xuICBsZXQgcGFydHMgPSBjaGFuZ2VzWzBdLnRvU3RyaW5nKCkuc3BsaXQoXCI6XCIpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdIDogY2hhbmdlc1swXTtcbn1cblxuZnVuY3Rpb24gX291dGxldChjaGFuZ2VzOiBhbnlbXSk6IHN0cmluZyB7XG4gIGlmICghaXNTdHJpbmcoY2hhbmdlc1swXSkpIHJldHVybiBudWxsO1xuICBsZXQgcGFydHMgPSBjaGFuZ2VzWzBdLnRvU3RyaW5nKCkuc3BsaXQoXCI6XCIpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzBdIDogbnVsbDtcbn1cbiJdfQ==