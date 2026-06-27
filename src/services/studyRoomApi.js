import axiosSecure from "@/lib/axiosSecure"

export const getStudyRooms = async () => {
   const {data}  = await axiosSecure.get("/rooms");
   console.log(data)
   return data;
}

export const getStudyRoomsById = async (id) => {
  const {data} = await axiosSecure.get(`/rooms/${id}`);
  return data;
}