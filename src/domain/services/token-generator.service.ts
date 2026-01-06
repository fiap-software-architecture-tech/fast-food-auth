export interface TokenResult {
    token: string;
    expiresIn: string;
}

export interface ITokenGeneratorService {
    sign(cpf: string): TokenResult;
}
