import gql from "graphql-tag";

const I18N_FIELDS = `
    values {
        value
        locale
    }
`;

export const FIELDS_FIELDS = `
        _id
        fieldId
        type
        label {
            ${I18N_FIELDS}
        }
        placeholderText {
            ${I18N_FIELDS}
        }
        helpText {
            ${I18N_FIELDS}
        }  
        predefinedValues {
            enabled
            values {
                ${I18N_FIELDS}
            }
        }
        multipleValues 
        renderer {
            name
        }
        validation {
            name
            settings
            message {
                ${I18N_FIELDS}
            }
        }
        settings
`;

export const GET_CONTENT_MODEL = gql`
    query GetContentModel($id: ID!) {
        getContentModel(id: $id) {
            data {
                id
                name
                description
                modelId
                titleFieldId
                lockedFields {
                    fieldId
                }
                fields {
                    ${FIELDS_FIELDS}
                }
                indexes {
                    fields
                    createdOn
                }
                layout
            }
            error {
                code
                message
                data
            }
        }
    }
`;

export const UPDATE_CONTENT_MODEL = gql`
    mutation UpdateContentModel($id: ID!, $data: CmsContentModelInput!) {
        updateContentModel(id: $id, data: $data) {
            data {
                id
                name
                titleFieldId
                fields {
                    ${FIELDS_FIELDS}
                }
                layout
            }
            error {
                code
                message
                data
            }
        }
    }
`;
