import StudentInterface from "../interfaces/Student.interface";

/* QUERY MAKER */
const makeDataQuery = (values: StudentInterface, newBatch: boolean, newSocialAssistant: boolean) => {
  return {
      firstName: values.firstName,
      lastName: values.lastName,
      sexe: values.sexe,
      privateEmail: values.privateEmail,
      pocoEmail: values.pocoEmail,
      residencePermit: values.residencePermit,
      birthday: values.birthday,
      nationality: values.nationality,
      addressStreet: values.addressStreet,
      addressCity: values.addressCity,
      addressNPA: values.addressNPA,
      addressCanton: values.addressCanton,
      organisation: values.organisation === "" ? null : values.organisation,
      financialParticipation: values.financialParticipation,
      financialParticipationComment: values.financialParticipation === "" ? null : values.financialParticipation,
      socialAssistant: makeDataQuerySocialAssistant(values, newSocialAssistant),
      borrowLaptops: values.borrowLaptops,
      foodCost: values.foodCost === "" ? null : values.foodCost,
      batch: makeDataQueryBatch(values, newBatch)
  }
}

const makeDataQuerySocialAssistant = (values: StudentInterface, newSocialAssistant: boolean) => {
return values.socialAssistant ? (values.socialAssistant.id !== null ?
  // Have a social assistant
  (newSocialAssistant ?
    // Add new social assistant
    {
      create: {
        firstName: values.socialAssistant.firstName,
        lastName: values.socialAssistant.lastName,
        phone: values.socialAssistant.phone,
        email: values.socialAssistant.email
      }
    }
    :
    {
      connect: {
        id: values.socialAssistant.id,
      }
    }) : null) : null;
}

const makeDataQueryBatch = (values: StudentInterface, newBatch: boolean) => {
  return values.batch ? (values.batch.id !== null ?
      (newBatch ?
          {
              create: {
                  name: values.batch.name,
                  startingTime: values.batch.startingTime,
                  endTime: values.batch.endTime,
              }
          }
          :
          {
              connect: {
                  id: values.batch.id,
              }
          }
      ) : null
  ) : null;
}

export default makeDataQuery;