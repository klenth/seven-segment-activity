// Generated from Logic.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import LogicListener from './LogicListener.js';

import Ast from "./ast";


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\rB\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "%\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003*\n\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u00037",
    "\n\u0003\f\u0003\u000e\u0003:\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0005\u0004@\n\u0004\u0003\u0004\u0002\u0003\u0004",
    "\u0005\u0002\u0004\u0006\u0002\u0002\u0002H\u0002\b\u0003\u0002\u0002",
    "\u0002\u0004$\u0003\u0002\u0002\u0002\u0006?\u0003\u0002\u0002\u0002",
    "\b\t\b\u0002\u0001\u0002\t\n\u0005\u0004\u0003\u0002\n\u000b\u0007\u0002",
    "\u0002\u0003\u000b\f\b\u0002\u0001\u0002\f\u0003\u0003\u0002\u0002\u0002",
    "\r\u000e\b\u0003\u0001\u0002\u000e\u000f\u0007\f\u0002\u0002\u000f%",
    "\b\u0003\u0001\u0002\u0010\u0011\u0007\u0003\u0002\u0002\u0011\u0012",
    "\u0005\u0004\u0003\u0002\u0012\u0013\u0007\u0004\u0002\u0002\u0013\u0014",
    "\b\u0003\u0001\u0002\u0014%\u0003\u0002\u0002\u0002\u0015\u0016\u0007",
    "\u0006\u0002\u0002\u0016\u0017\u0005\u0004\u0003\t\u0017\u0018\b\u0003",
    "\u0001\u0002\u0018%\u0003\u0002\u0002\u0002\u0019\u001a\u0007\u000b",
    "\u0002\u0002\u001a\u001b\u0007\u0005\u0002\u0002\u001b\u001c\u0005\u0004",
    "\u0003\u0005\u001c\u001d\b\u0003\u0001\u0002\u001d%\u0003\u0002\u0002",
    "\u0002\u001e\u001f\u0007\u0005\u0002\u0002\u001f \u0005\u0004\u0003",
    "\u0004 !\b\u0003\u0001\u0002!%\u0003\u0002\u0002\u0002\"#\u0007\u000b",
    "\u0002\u0002#%\b\u0003\u0001\u0002$\r\u0003\u0002\u0002\u0002$\u0010",
    "\u0003\u0002\u0002\u0002$\u0015\u0003\u0002\u0002\u0002$\u0019\u0003",
    "\u0002\u0002\u0002$\u001e\u0003\u0002\u0002\u0002$\"\u0003\u0002\u0002",
    "\u0002%8\u0003\u0002\u0002\u0002&)\f\u0007\u0002\u0002\'*\u0007\b\u0002",
    "\u0002(*\u0003\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002)(\u0003",
    "\u0002\u0002\u0002*+\u0003\u0002\u0002\u0002+,\u0005\u0004\u0003\b,",
    "-\b\u0003\u0001\u0002-7\u0003\u0002\u0002\u0002./\f\u0006\u0002\u0002",
    "/0\u0005\u0006\u0004\u000201\u0005\u0004\u0003\u000712\b\u0003\u0001",
    "\u000227\u0003\u0002\u0002\u000234\f\b\u0002\u000245\u0007\u0007\u0002",
    "\u000257\b\u0003\u0001\u00026&\u0003\u0002\u0002\u00026.\u0003\u0002",
    "\u0002\u000263\u0003\u0002\u0002\u00027:\u0003\u0002\u0002\u000286\u0003",
    "\u0002\u0002\u000289\u0003\u0002\u0002\u00029\u0005\u0003\u0002\u0002",
    "\u0002:8\u0003\u0002\u0002\u0002;<\u0007\t\u0002\u0002<@\b\u0004\u0001",
    "\u0002=>\u0007\n\u0002\u0002>@\b\u0004\u0001\u0002?;\u0003\u0002\u0002",
    "\u0002?=\u0003\u0002\u0002\u0002@\u0007\u0003\u0002\u0002\u0002\u0007",
    "$)68?"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LogicParser extends antlr4.Parser {

    static grammarFileName = "Logic.g4";
    static literalNames = [ null, "'('", "')'", "':'", null, "'''" ];
    static symbolicNames = [ null, null, null, null, "NOT", "POSTNOT", "AND", 
                             "OR", "XOR", "ID", "BIT", "WS" ];
    static ruleNames = [ "func", "bool", "orOp" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LogicParser.ruleNames;
        this.literalNames = LogicParser.literalNames;
        this.symbolicNames = LogicParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.bool_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    bool_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 5);
    		case 1:
    			return this.precpred(this._ctx, 4);
    		case 2:
    			return this.precpred(this._ctx, 6);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	func() {
	    let localctx = new FuncContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LogicParser.RULE_func);
	    try {
	        this.enterOuterAlt(localctx, 1);
	         Ast.reset(); 
	        this.state = 7;
	        localctx._bool = this.bool(0);
	        this.state = 8;
	        this.match(LogicParser.EOF);
	         localctx.n =  localctx._bool.n; localctx.n.display = true;; 
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	bool(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new BoolContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, LogicParser.RULE_bool, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 34;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 12;
	            localctx._BIT = this.match(LogicParser.BIT);
	             localctx.n =  Ast.getNode(new Ast.BitNode(!!((localctx._BIT===null ? null : localctx._BIT.text) - 0))); 
	            break;

	        case 2:
	            this.state = 14;
	            this.match(LogicParser.T__0);
	            this.state = 15;
	            localctx._bool = this.bool(0);
	            this.state = 16;
	            this.match(LogicParser.T__1);
	             localctx.n =  localctx._bool.n; 
	            break;

	        case 3:
	            this.state = 19;
	            this.match(LogicParser.NOT);
	            this.state = 20;
	            localctx._bool = this.bool(7);
	             localctx.n =  Ast.getNode(new Ast.NotNode(localctx._bool.n)); 
	            break;

	        case 4:
	            this.state = 23;
	            localctx._ID = this.match(LogicParser.ID);
	            this.state = 24;
	            this.match(LogicParser.T__2);
	            this.state = 25;
	            localctx._bool = this.bool(3);
	             localctx.n =  localctx._bool.n; localctx.n.display = true;; localctx.n.name = (localctx._ID===null ? null : localctx._ID.text);; 
	            break;

	        case 5:
	            this.state = 28;
	            this.match(LogicParser.T__2);
	            this.state = 29;
	            localctx._bool = this.bool(2);
	             localctx.n =  localctx._bool.n; localctx.n.display = true;; 
	            break;

	        case 6:
	            this.state = 32;
	            localctx._ID = this.match(LogicParser.ID);
	             localctx.n =  Ast.getNode(new Ast.VarNode((localctx._ID===null ? null : localctx._ID.text))); 
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 54;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 52;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BoolContext(this, _parentctx, _parentState);
	                    localctx.l = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_bool);
	                    this.state = 36;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 39;
	                    this._errHandler.sync(this);
	                    switch(this._input.LA(1)) {
	                    case LogicParser.AND:
	                        this.state = 37;
	                        this.match(LogicParser.AND);
	                        break;
	                    case LogicParser.T__0:
	                    case LogicParser.T__2:
	                    case LogicParser.NOT:
	                    case LogicParser.ID:
	                    case LogicParser.BIT:
	                        break;
	                    default:
	                        throw new antlr4.error.NoViableAltException(this);
	                    }
	                    this.state = 41;
	                    localctx.r = localctx._bool = this.bool(6);
	                     localctx.n =  Ast.getNode(new Ast.AndNode(localctx.l.n, localctx.r.n)); 
	                    break;

	                case 2:
	                    localctx = new BoolContext(this, _parentctx, _parentState);
	                    localctx.l = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_bool);
	                    this.state = 44;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 45;
	                    localctx.op = this.orOp();
	                    this.state = 46;
	                    localctx.r = localctx._bool = this.bool(5);
	                     localctx.n =  Ast.getNode((localctx.op.op === "or") ? new Ast.OrNode(localctx.l.n, localctx.r.n) : new Ast.XorNode(localctx.l.n, localctx.r.n)); 
	                    break;

	                case 3:
	                    localctx = new BoolContext(this, _parentctx, _parentState);
	                    localctx.b = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, LogicParser.RULE_bool);
	                    this.state = 49;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 50;
	                    this.match(LogicParser.POSTNOT);
	                     localctx.n =  Ast.getNode(new Ast.NotNode(localctx.b.n)); 
	                    break;

	                } 
	            }
	            this.state = 56;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	orOp() {
	    let localctx = new OrOpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LogicParser.RULE_orOp);
	    try {
	        this.state = 61;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LogicParser.OR:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 57;
	            this.match(LogicParser.OR);
	             localctx.op =  "or"; 
	            break;
	        case LogicParser.XOR:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 59;
	            this.match(LogicParser.XOR);
	             localctx.op =  "xor"; 
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

LogicParser.EOF = antlr4.Token.EOF;
LogicParser.T__0 = 1;
LogicParser.T__1 = 2;
LogicParser.T__2 = 3;
LogicParser.NOT = 4;
LogicParser.POSTNOT = 5;
LogicParser.AND = 6;
LogicParser.OR = 7;
LogicParser.XOR = 8;
LogicParser.ID = 9;
LogicParser.BIT = 10;
LogicParser.WS = 11;

LogicParser.RULE_func = 0;
LogicParser.RULE_bool = 1;
LogicParser.RULE_orOp = 2;

class FuncContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_func;
        this.n = null
        this._bool = null; // BoolContext
    }

	bool() {
	    return this.getTypedRuleContext(BoolContext,0);
	};

	EOF() {
	    return this.getToken(LogicParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterFunc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitFunc(this);
		}
	}


}



class BoolContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_bool;
        this.n = null
        this.b = null; // BoolContext
        this.l = null; // BoolContext
        this._BIT = null; // Token
        this._bool = null; // BoolContext
        this._ID = null; // Token
        this.r = null; // BoolContext
        this.op = null; // OrOpContext
    }

	BIT() {
	    return this.getToken(LogicParser.BIT, 0);
	};

	bool = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BoolContext);
	    } else {
	        return this.getTypedRuleContext(BoolContext,i);
	    }
	};

	NOT() {
	    return this.getToken(LogicParser.NOT, 0);
	};

	ID() {
	    return this.getToken(LogicParser.ID, 0);
	};

	AND() {
	    return this.getToken(LogicParser.AND, 0);
	};

	orOp() {
	    return this.getTypedRuleContext(OrOpContext,0);
	};

	POSTNOT() {
	    return this.getToken(LogicParser.POSTNOT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterBool(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitBool(this);
		}
	}


}



class OrOpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_orOp;
        this.op = null
    }

	OR() {
	    return this.getToken(LogicParser.OR, 0);
	};

	XOR() {
	    return this.getToken(LogicParser.XOR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterOrOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitOrOp(this);
		}
	}


}




LogicParser.FuncContext = FuncContext; 
LogicParser.BoolContext = BoolContext; 
LogicParser.OrOpContext = OrOpContext; 
