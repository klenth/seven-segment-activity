grammar Logic;

@header {
import Ast from "./ast";
}

func
returns [Node n]
    : { Ast.reset(); }
        bool EOF                    { $n = $bool.n;; $n.display = true;; }
    ;

bool
returns [Node n]
    : BIT                           { $n = Ast.getNode(new Ast.BitNode(!!($BIT.text - 0)));; }
    | '(' bool ')'                  { $n = $bool.n;; }
    | b=bool POSTNOT                { $n = Ast.getNode(new Ast.NotNode($b.n));; }
    | l=bool (AND | ) r=bool        { $n = Ast.getNode(new Ast.AndNode($l.n, $r.n));; }
    | l=bool op=orOp r=bool         { $n = Ast.getNode(($op.op === "or") ? new Ast.OrNode($l.n, $r.n) : new Ast.XorNode($l.n, $r.n));; }
    | ID                            { $n = Ast.getNode(new Ast.VarNode($ID.text));; }
    ;

orOp
returns [String op]
    : OR                            { $op = "or";; }
    | XOR                           { $op = "xor";; }
    ;

POSTNOT
    : '\''
    | '’'
    | '‘'
    ;
    
AND
    : '*'
    | '•'
    ;

OR
    : '+'
    ;

XOR
    : '^'
    ;

ID
    : [a-zA-Z]
    ;

BIT
    : [01]
    ;

WS
    : [ \r\n\t]+ -> skip
    ;
