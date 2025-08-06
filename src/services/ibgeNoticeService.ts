import { ScrapingNoticia } from "@/models/scrapingNoticia";
import axios from "axios";
import * as cheerio from "cheerio";

const API_BASE_URL = "https://servicodados.ibge.gov.br/api/v3/noticias/";

export default {
  async getNotices(busca: string = '', qtd: number = 10, page: number = 1) {
    try {
      const url =
        busca.length === 0
          ? `${API_BASE_URL}/?tipo=noticia&qtd=${qtd}&page=${page}`
          : `${API_BASE_URL}/?busca=${busca}&qtd=${qtd}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar avisos do IBGE:", error);
      throw error;
    }
  },

  async scrapingNotice(link: string) {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${link}`;
      const response = await axios.get(proxyUrl);
      const html = cheerio.load(response.data.contents);
      html(".texto--single").find("figure").remove();
      html(".texto--single").find("img").remove();
      html(".texto--single").find("iframe").remove();
      html(".texto--single").find("#slider-video").remove();

      const retorno = {
        titulo: html("h2").text().replaceAll(/\s+/g, " ").trim(),
        editoria: html(".metadados--single")
          .text()
          .replaceAll(/\s+/g, " ")
          .trim(),
        atualizadoEm: html(".noticias__info--superior")
          .text()
          .replaceAll(/\s+/g, " ")
          .trim(),
        conteudo: html(".texto--single").html() ?? "",
      } as ScrapingNoticia;

      return retorno;
    } catch (error) {
      console.error("Erro ao fazer scraping do aviso:", error);
      throw error;
    }
  },
};
