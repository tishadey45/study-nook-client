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

export const addStudyRoom = async (studyRoomData) => {
  const response = await axiosSecure.post("/add-room", studyRoomData);
  return response.data;
}

export const getMyListings = async (email) => {
  const { data } = await axiosSecure.get(`/my-listings/${email}`);
  return data;
};

export const deleteRoom = async (id) => {
  const { data } = await axiosSecure.delete(`/rooms/${id}`);
  return data;
};