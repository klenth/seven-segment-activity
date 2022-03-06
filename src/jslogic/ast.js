var _nodes = [];
function getNode(newNode) {
    for (var node of _nodes) {
        if (node.equals(newNode))
            return node;
    }

    _nodes.push(newNode);
    return newNode;
}

function reset() {
    _nodes = [];
}

class AstNode {
    constructor() {
        this.display = false;
        this.name = null;
        this.precedence = -1;
    }

    children() {
        return []
    }

    getVars(node, vars) {
        node = node || this;
        vars = vars || new Set();

        node.addVars(vars);
        for (var child of node.children()) {
            child.addVars(vars);
            this.getVars(child, vars);
        }

        return vars;
    }

    addVars(vars) {
    }

    getDisplayedChildren(dispChildren) {
        dispChildren = dispChildren || [];
        this.children().forEach(c => c.getDisplayedChildren(dispChildren));
        if (this.display && dispChildren.indexOf(this) === -1)
            dispChildren.push(this);
        return dispChildren;
    }

    toString() {
        return "?";
    }

    childNameOrString(child) {
        if (child.name)
            return child.name;
        else {
            var str = child.toString();
            if (this.precedence > child.precedence)
                str = "(" + str + ")";
            return str;
        }
    }

    equals(node) {
        return false;
    }
}

class BitNode extends AstNode {
    constructor(bit) {
        super();
        this.bit = bit;
        this.precedence = 1000;
    }

    evaluate() {
        return this.bit;
    }

    toString() {
        return "" + (+this.bit);
    }

    equals(node) {
        return (node instanceof BitNode && this.bit === node.bit);
    }
}

class VarNode extends AstNode {
    constructor(varName) {
        super();
        this.varName = varName;
        this.precedence = 1000;
    }

    evaluate(vars) {
        return vars[this.varName];
    }

    addVars(vars) {
        vars.add(this.varName);
    }

    toString() {
        return this.varName;
    }

    equals(node) {
        return (node instanceof VarNode && this.varName === node.varName);
    }
}

class NotNode extends AstNode {
    constructor(child) {
        super();
        this.child = child;
        this.precedence = 100;
    }

    evaluate(vars) {
        return !this.child.evaluate(vars);
    }

    children() {
        return [this.child];
    }

    toString() {
        return "¬" + this.childNameOrString(this.child);
    }

    equals(node) {
        return (node instanceof NotNode && this.child.equals(node.child));
    }
}

class BinaryNode extends AstNode {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(vars) {
        var lv = this.left.evaluate(vars);
        var rv = this.right.evaluate(vars);
        return this._eval(lv, rv);
    }

    children() {
        return [this.left, this.right];
    }

    toString() {
        var leftStr = this.childNameOrString(this.left),
            rightStr = this.childNameOrString(this.right);
        return leftStr + " " + this.op + " " + rightStr;
    }

    equals(node) {
        return (node instanceof BinaryNode && this.op === node.op
            && this.left.equals(node.left) && this.right.equals(node.right));
    }
}

class AndNode extends BinaryNode {
    constructor(left, right) {
        super(left, right);
        this.precedence = 50;
        this.op = "";
    }

    _eval(l, r) {
        return l && r;
    }

    toString() {
        var leftStr = this.childNameOrString(this.left),
            rightStr = this.childNameOrString(this.right);
        return leftStr + "\u202f" + rightStr;
    }
}

class OrNode extends BinaryNode {
    constructor(left, right) {
        super(left, right);
        this.precedence = 25;
        this.op = "+";
    }

    _eval(l, r) {
        return l || r;
    }
}

class XorNode extends BinaryNode {
    constructor(left, right) {
        super(left, right);
        this.precedence = 25;
        this.op = "⊕";
    }

    _eval(l, r) {
        return !!(l ^ r);
    }
}

const exports = {
    BitNode: BitNode,
    VarNode: VarNode,
    NotNode: NotNode,
    AndNode: AndNode,
    OrNode: OrNode,
    XorNode: XorNode,
    getNode: getNode,
    reset: reset,
}

export default exports;
