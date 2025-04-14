import api from "../other/api";


export const  statService = {
    async getDashboardData(){
        try {
          const responce = await api.get("/dashboard_stat");
          console.log(responce.data.data);
          return { data: responce?.data?.data };
        } catch (error) {
          console.log("err", error);
        }

    }

}