'use strict';

class ConvertToJson {
  register(Model) {
    Model.addHook('beforeSave', (modelInstance) => {
      return this.convertToString(Model, modelInstance);
    });
    Model.addHook('afterSave', (modelInstance) => {
      return this.convertToJson(Model, modelInstance);
    });
    Model.addHook('afterFind', (modelInstance) => {
      return this.convertToJson(Model, modelInstance);
    });
    Model.addHook('afterFetch', (modelInstanceArray) => {
      for (let modelInstance of modelInstanceArray) {
        this.convertToJson(Model, modelInstance);
      }
      return modelInstanceArray;
    });
    Model.addHook('afterPaginate', (modelInstanceArray) => {
      for (let modelInstance of modelInstanceArray) {
        this.convertToJson(Model, modelInstance);
      }
      return modelInstanceArray;
    });
  }

  convertToString(Model, modelInstance) {
    let json_fields = Model.jsonFields;
    if (json_fields) {
      for (const field of json_fields) {
        if (modelInstance[field]) {
          if (typeof modelInstance[field] == 'string') {
            continue;
          }
          modelInstance[field] = JSON.stringify(modelInstance[field]);
        }
      }
    }
    return modelInstance;
  }

  convertToJson(Model, modelInstance) {
    let json_fields = Model.jsonFields;
    if (json_fields) {
      for (const field of json_fields) {
        if (modelInstance[field]) {
          try {
            modelInstance[field] = JSON.parse(modelInstance[field]);
          } catch (error) {}
        }
      }
    }
    return modelInstance;
  }
}

module.exports = ConvertToJson;
