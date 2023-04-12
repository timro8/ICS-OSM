import cloudinary from 'cloudinary';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(function () {
  if (Meteor.settings && Meteor.settings.cloudinary) {
    const { cloud_name, api_key, api_secret } = Meteor.settings.cloudinary;
    cloudinary.v2.config({
      cloud_name: cloud_name,
      api_key: api_key,
      api_secret: api_secret,
    });
  }
});

Meteor.methods({
  'deleteImage'(imageUrl) {
    check(imageUrl, String);
    const startIndex = imageUrl.lastIndexOf('/') + 1;
    const endIndex = imageUrl.lastIndexOf('.');
    const public_id = imageUrl.substring(startIndex, endIndex);

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(public_id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
});
