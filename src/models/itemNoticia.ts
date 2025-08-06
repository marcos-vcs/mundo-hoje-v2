import { Imagem } from "./imagem";

export interface ItemNoticia {
    data_publicacao: string;
    destaque: boolean;
    editoria: string;
    id: number;
    introducao: string;
    link: string;
    titulo: string;
    tipo: string;
    produto_id: number;
    imagens: Imagem;
    favorito?: boolean;
}