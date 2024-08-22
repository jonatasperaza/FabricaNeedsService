import ping from "ping";

export const pingStatus = async (): Promise<ping.PingResponse> => {
  const res = await ping.promise.probe(
    "fabrica-needs-front-equipe5.vercel.app"
  );
  console.log(res);
  return res;
};
