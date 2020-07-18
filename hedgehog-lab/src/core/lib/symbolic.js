import nerdamer from 'nerdamer';

export class Sym {
  expression: string;
  constructor(varName?: string) {
    if (varName) this.expression = '(' + varName + ')';
    else this.expression = '';
  }

  [Symbol.for('+')](rightOperand: Sym | number): Sym {
    if (rightOperand instanceof Sym) {
      return new Sym(this.expression + '+' + rightOperand.expression);
    } else if (typeof rightOperand === 'number') {
      return new Sym(this.expression + '+' + rightOperand.toString());
    }
  }

  [Symbol.for('-')](rightOperand: Sym | number): Sym {
    if (rightOperand instanceof Sym) {
      return new Sym(this.expression + '-' + rightOperand.expression);
    } else if (typeof rightOperand === 'number') {
      return new Sym(this.expression + '-' + rightOperand.toString());
    }
  }

  [Symbol.for('*')](rightOperand: Sym | number): Sym {
    if (rightOperand instanceof Sym) {
      return new Sym(this.expression + '*' + rightOperand.expression);
    } else if (typeof rightOperand === 'number') {
      return new Sym(this.expression + '*' + rightOperand.toString());
    }
  }

  [Symbol.for('/')](rightOperand: Sym | number): Sym {
    if (rightOperand instanceof Sym) {
      return new Sym(this.expression + '/' + rightOperand.expression);
    } else if (typeof rightOperand === 'number') {
      return new Sym(this.expression + '/' + rightOperand.toString());
    }
  }

  [Symbol.for('^')](rightOperand: Sym | number): Sym {
    if (rightOperand instanceof Sym) {
      return new Sym(this.expression + '^' + rightOperand.expression);
    } else if (typeof rightOperand === 'number') {
      return new Sym(this.expression + '^' + rightOperand.toString());
    }
  }

  toString(): string {
    return nerdamer(this.expression).toString();
  }

  toTex(): string {
    return nerdamer(this.expression).toTeX();
  }
}
