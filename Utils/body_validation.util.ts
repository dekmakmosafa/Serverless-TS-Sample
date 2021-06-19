import Ajv from "ajv"

const ajv = new Ajv()

export class BodyValidationUtil {


    validateInput(_schema, _forum_body) {
        const validate = ajv.compile(_schema)
        const validation_res = validate(_forum_body)

        if (!validation_res) {
            throw new Error(JSON.stringify(validate.errors));
        }
        return validation_res
    }


}
