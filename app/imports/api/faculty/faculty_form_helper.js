import axios from 'axios';

export async function uploadImgUrl(img) {
  const formData = new FormData();
  formData.append('file', img);
  formData.append('upload_preset', 'sasn8bgb');
  // Upload the image to Cloudinary
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dmbrfkjk3/image/upload', formData);
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    return error;
  }
}

export function getTimeSelection() {
  const arr = [];
  for (let j = 1; j < 24; j++) {
    for (let i = 0; i < 60; i += 5) {
      if (i < 10) {
        arr.push(`${j}:0${i}`);
      } else {
        arr.push(`${j}:${i}`);
      }
    }
  }
  arr.push('--');
  return arr;
}
