import axios from 'axios';

// eslint-disable-next-line consistent-return
export async function uploadImgUrl(img) {
  const formData = new FormData();
  formData.append('file', img);
  formData.append('upload_preset', 'sasn8bgb');
  // Upload the image to Cloudinary
  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dmbrfkjk3/image/upload', formData);
    const imageUrl = response.data.secure_url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error(error);
  }
}
