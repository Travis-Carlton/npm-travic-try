export interface GetError {
	error: Error;
	unhandled: boolean;
	[propName: string]: any;
}

export class Try {
	private val: any = null;
	private err: Error | null = null;
	private errFn: Function | null = null;

	constructor(fn: Function) {
		try {
			this.val = fn();
		} catch (err) {
			this.err = err;
		}
	}

	public static of(fn: Function): Try {
		return new this(fn);
	}

	public get() {
		if (this.errFn) {
			this.val = this.errFn();
		} else if (this.err && !this.errFn) {
			this.val = {
				error: this.err,
				unhandled: true,
			} as GetError;
		}
		return this.val;
	}

	public getOrElse(elseVal: any) {
		this.ifError(() => (this.val = elseVal));
		return this.val;
	}

	public onFailure(fn: Function) {
		this.ifError(() => (this.errFn = () => fn(this.err)));
		return this;
	}

	public get isSuccess() {
		return !this.err;
	}

	private ifError(fn: Function) {
		if (this.err) fn();
	}
}
