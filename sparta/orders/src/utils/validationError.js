class ValidationError extends Error{
    constructor(message, fieldname){
        super(message);
        this.fieldname = fieldname;
    };
};

export default ValidationError