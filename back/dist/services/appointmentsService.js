"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentByIdService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
//Implementar una función que pueda retornar el arreglo completo de turnos.
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield data_source_1.AppointmentModel.find();
    return allAppointments;
});
exports.getAppointmentsService = getAppointmentsService;
//Implementar una función que pueda obtener el detalle de un turno por ID.
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield data_source_1.AppointmentModel.findOne({ where: { id }, relations: { user: true } });
    if (!foundAppointment)
        throw Error("No se encontró el turno en la DB");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
//Implementar una función que pueda crear un nuevo turno, siempre guardando el ID del usuario que ha creado dicho turno.
const createAppointmentService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield data_source_1.AppointmentModel.create(params);
    const id = params.userId;
    const user = yield data_source_1.UserModel.findOneBy({ id });
    if (user) {
        newAppointment.user = user;
        yield data_source_1.AppointmentModel.save(newAppointment);
    }
    else {
        throw Error("El id no pertenece a un usuario");
    }
});
exports.createAppointmentService = createAppointmentService;
// Implementar una función que reciba el id de un turno específico y cambiar su estado a “cancelled”.
const cancelAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield data_source_1.AppointmentModel.findOneBy({ id });
    if (foundAppointment) {
        foundAppointment.status = "cancelled";
        yield data_source_1.AppointmentModel.save(foundAppointment);
    }
    else {
        throw Error("El id no correponde a un turno existente");
    }
});
exports.cancelAppointmentByIdService = cancelAppointmentByIdService;
