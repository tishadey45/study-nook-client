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

export const updateRoom = async (id, updatedData) => {
  const { data } = await axiosSecure.put(`/api/rooms/${id}`, updatedData);
  return data;
}

export const deleteRoom = async (id) => {
  const { data } = await axiosSecure.delete(`/api/rooms/${id}`);
  return data;
};

export const myBookings = async (bookingData) => {
  const { data } = await axiosSecure.post(`/order`, bookingData);
  return data;
}

export const getMyBookings = async (email) => {
  const { data } = await axiosSecure.get(`/my-bookings/${email}`);
  return data;
}

export const cancelBooking = async (bookingId) => {
  const { data } = await axiosSecure.patch(`/api/bookings/${bookingId}/cancel`);
  return data;
}