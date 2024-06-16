import { Promise } from 'es6-promise';
interface IStatChecker {
    registerCheckStatHook(fn: any): void;
    check(params: any): void;
}
declare class StatChecker implements IStatChecker {
    registerCheckStatHook(fn: (requestParams: object, p: Promise<any>) => any): void;
    check({ distinct_id, eventCode, platform, params }: any): void;
    private hook;
}
declare const statChecker: StatChecker;
export default statChecker;
