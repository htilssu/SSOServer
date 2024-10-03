export class ErrorModel {
    constructor(
        public err: string,
        public msg: string,
        public code: number
    ) {}
}