import mongoose from "mongoose";

export const DenounceSchema = new mongoose.Schema({
    schoolgrade: { type: String },
    school: { type: String },
    career: { type: String },
    violenceType: { type: String, enum: ["physical", "sexual", "verbal", "patrimonial"] },
    personDenounced: {
        type: String,
        enum: [
            "classmate", "schoolmate", "teacher", "school relationship",
            "external relationship", "principal", "administrative", "multipurpose",
            "non-school", "other"
        ]
    },
    personDenouncedGender: { type: String, enum: ["M", "F", "O"] },
    //aula, oficina o privado, area comunes, baños, fuera de la escula realizando una actividad academica, fuera de la escuala en otra actividad
    incidentLocation: { type: String, enum: ["classroom", "office", "common area", "bathroom", "outside school with academic activity", "outside school with other activity", "other"] },
    //ninguna, denuncia a maestro, autoridad escolar, instancia de gobierno, otro
    actionTaken: { type: String, enum: ["none", "teacher", "school authority", "instance", "other"] },
    somenthingHappened: { type: String },
    // mas de 12 meses, entre 6 y 12 meses, entre 3 y 6 meses, entre 1 y 3 meses, en los ultimos 15 dias
    timeSinceIncident: { type: String, enum: ["more than 12 months", "between 6 and 12 months", "between 3 and 6 months", "between 1 and 3 months", "last 15 days"] },
    //Atencion psicologica, psiquiatrica, medica, interrupcion legal del embarazo
    interventionType: { type: String, enum: ["psychological", "psychiatric", "medical", "legal abortion"] },
    //narracion de hechos
    interventionDescription: { type: String },
    //en tu institucion recibes informacion sobre los tipos de violencia
    informationReceived: { type: Boolean },
    //existen mecanismos para denunciar acciones de violencia
    mechanismsExist: { type: Boolean },
}, {
    timestamps: true,
    collection: "denounces"
});