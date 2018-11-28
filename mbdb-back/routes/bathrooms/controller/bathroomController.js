var Bathroom = require('../model/bathroomModel');

module.exports = {
  findBathrooms: (req, res) => {
    console.log('Grabbing all bathrooms (sent from bathroomController');
    Bathroom.find()
      .then(bathrooms => {
        console.log(bathrooms);
        let success = {};
        success.confirmation = true;
        success.payload = bathrooms;
        res.json(success);
      })
      .catch(err => {
        res.json(err);
      });
  },

  addBathroom: params => {
    //console.log('Params Received: ', params);
    let latitude = params.location.lat;
    let longitude = params.location.lng;
    return new Promise((resolve, reject) => {
      Bathroom.findOne({ place_id: params.place_id })
        .then(bathroom => {
          console.log('----------');
          console.log(bathroom);
          if (bathroom) {
            let errors = {};
            errors.code = 'Bathroom Already Exists';
            errors.status = 400;
            reject(errors);
          } else {
            const newBathroom = new Bathroom({
              place_id: params.place_id,
              name: params.name,
              address: params.address,
              lat: latitude,
              lng: longitude,
              code: params.code,
              isPublic: params.isPublic,
              quality: params.quality
            });

            newBathroom
              .save()
              .then(newBathroom => resolve(newBathroom))
              .catch(err => reject(err));
          } //end else
        })
        .catch(err => {
          reject(err);
        });
    });
  } //end addBathroom
}; //module exports
