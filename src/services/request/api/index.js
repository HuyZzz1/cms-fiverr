import httpAdmin from "../httpAdmin";

export const apiSignIn = async (params) => {
  const { data } = await httpAdmin.post("/auth/signin", params);

  return data;
};

export const apiGetInfoDetailAdmin = async (params) => {
  const { data } = await httpAdmin.get(`/users/${params}`);

  return data;
};

//user

export const apiGetUsersList = async () => {
  const { data } = await httpAdmin.get("/users");

  return data;
};

export const apiCreateUser = async (params) => {
  const { data } = await httpAdmin.post("/users", params);

  return data;
};

export const apiUpdateUser = async (params) => {
  const { data } = await await httpAdmin.put(`/users/${params.id}`, params);

  return data;
};

export const apiDeleteUser = async (params) => {
  const { data } = await httpAdmin.delete("/users", {
    params: {
      id: params,
    },
  });
  return data;
};

export const apiSearchUser = async (params) => {
  const { data } = await httpAdmin.get(`/users/search/${params}`);

  return data;
};

//job

export const apiGetJobsList = async () => {
  const { data } = await httpAdmin.get("/cong-viec");

  return data;
};

export const apiDeleteJob = async (params) => {
  const { data } = await await httpAdmin.delete(`/cong-viec/${params}`, {
    params: {
      id: params,
    },
  });

  return data;
};

//job Type

export const apiGetJobsTypeList = async () => {
  const { data } = await httpAdmin.get("/loai-cong-viec");

  return data;
};

export const apiCreateJobsType = async (params) => {
  const { data } = await httpAdmin.post("/loai-cong-viec", params);

  return data;
};

export const apiUpdateJobsType = async (params) => {
  const { data } = await httpAdmin.put(`/loai-cong-viec/${params.id}`, params);

  return data;
};

export const apiDeleteJobsType = async (params) => {
  const { data } = await httpAdmin.delete(`/loai-cong-viec/${params}`, {
    params: {
      id: params,
    },
  });

  return data;
};

//booking job
export const apiGetBookingJobsList = async () => {
  const { data } = await httpAdmin.get("/thue-cong-viec");

  return data;
};

export const apiDeleteBookingJob = async (params) => {
  const { data } = await httpAdmin.delete(`/thue-cong-viec/${params}`, {
    params: {
      id: params,
    },
  });

  return data;
};
