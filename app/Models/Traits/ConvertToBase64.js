'use strict';

class ConvertToBase64 {
  register(Model) {
    Model.addHook('beforeSave', modelInstance => {
      return this.convertToBase64(Model, modelInstance);
    });
    Model.addHook('afterSave', modelInstance => {
      return this.convertToString(Model, modelInstance);
    });
    Model.addHook('afterFind', modelInstance => {
      return this.convertToString(Model, modelInstance);
    });
    Model.addHook('afterFetch', modelInstanceArray => {
      for (let modelInstance of modelInstanceArray) {
        this.convertToString(Model, modelInstance);
      }
      return modelInstanceArray;
    });
    Model.addHook('afterPaginate', modelInstanceArray => {
      for (let modelInstance of modelInstanceArray) {
        this.convertToString(Model, modelInstance);
      }
      return modelInstanceArray;
    });
  }

  convertToString(Model, modelInstance) {
    let Base64_fields = Model.Base64Fields;
    if (Base64_fields) {
      for (const field of Base64_fields) {
        if (modelInstance[field]) {
          modelInstance[field] = Buffer.from(
            modelInstance[field],
            'base64'
          ).toString();
        }
      }
    }
    return modelInstance;
  }

  convertToBase64(Model, modelInstance) {
    let Base64_fields = Model.Base64Fields;
    if (Base64_fields) {
      for (const field of Base64_fields) {
        if (modelInstance[field]) {
          try {
            modelInstance[field] = Buffer.from(modelInstance[field]).toString(
              'base64'
            );
          } catch (error) {}
        }
      }
    }
    return modelInstance;
  }
}

module.exports = ConvertToBase64;
