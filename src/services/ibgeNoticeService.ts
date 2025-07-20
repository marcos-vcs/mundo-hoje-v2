import axios from "axios";

const API_BASE_URL = "http://servicodados.ibge.gov.br/api/v3/noticias/";

export default {
  async getNotices(qtd: number = 10, page: number = 1) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/?tipo=noticia&qtd=${qtd}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar avisos do IBGE:", error);
      throw error;
    }
  },
};
