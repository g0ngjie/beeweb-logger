/**
 * 异常类
 */
class KError extends Error {

    errorCode: number;
    errorMsg: string;

    constructor(errorCode: number, errorMsg: string) {
        super(errorMsg);
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    /**
     * 系统错误
     */
    static RequestError(errorMsg?: string) {
        return new KError(2000, errorMsg || "internal error");
    }

    /**
     * 非法参数
     */
    static InvalidParameters(errorMsg?: string) {
        return new KError(2001, errorMsg || "invalid parameters");
    }

    /**
     * 验证失败
     */
    static VerifyFailure(errorMsg?: string) {
        return new KError(2002, errorMsg || "verify failure");
    }

    /**
     * 数据格式不正确
     */
    static InvalidFormatData(errorMsg?: string) {
        return new KError(2003, errorMsg || "invalid format data");
    }

    /**
     * 请求超时
     */
    static ConnectTimeOut(errorMsg?: string) {
        return new KError(2004, errorMsg || "connect timeout");
    }
}

export default KError;
