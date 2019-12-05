import React, { useEffect, useState } from 'react';
import StudentInterface from '../../interfaces/Student.interface';
import moment from 'moment';

export function useStudent() {
  return useState<StudentInterface>(
    {
        firstName: "",
        lastName: "",
        sexe: "MALE",
        privateEmail: "",
        pocoEmail: "",
        residencePermit: "",
        birthday: moment(),
        nationality: "",
        addressStreet: "",
        addressCity: "",
        addressNPA: null,
        addressCanton: "",
        organisation: "",
        socialAssistant: {
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        financialParticipation: "YES",
        financialParticipationComment: "",
        borrowLaptops: false,
        foodCost: "",
        batch: {
            id: null,
            name: "",
            startingTime: moment(),
            endTime: moment()
        }
    }
  );
}