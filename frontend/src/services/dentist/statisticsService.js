import api from "../other/api";


export const  statisticsService = {
    async getStatisticsData(){
        try {
          const responce = await api.get("/statistic_stat");
          console.log("responce statistics", responce);
          console.log(responce.data.data);
          return { data: responce?.data?.data };
        } catch (error) {
          console.log("err", error);
        }

    }

}