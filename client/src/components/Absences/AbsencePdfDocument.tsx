import React, { FunctionComponent } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import StudentInterface from '../../interfaces/Student.interface';
import moment from 'moment';
const logo = require('../../assets/img/poco_logo.jpg');
const colineSignature = require('../../assets/img/colineSignature.jpg');
const sorinSignature = require('../../assets/img/sorinSignature.png');
const magalySignature = require('../../assets/img/magalySignature.jpg');
const latoRegular = require('../../assets/fonts/Lato/Lato-Regular.ttf');
const latoBold = require('../../assets/fonts/Lato/Lato-Bold.ttf');

Font.register({
  family: 'Lato Bold',
  src: latoBold
})

Font.register({ 
  family: 'Lato', 
  src: latoRegular 
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Lato',
    textAlign: 'center',
    marginTop: '30px',
  },
  header: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  pocoTitle: {
    fontSize: 50,
    fontFamily: 'Lato Bold'
  },
  attestationTitle: {
    fontSize: 34,
    textDecoration: 'underline',
    marginBottom: '30px'
  },
  contentText: {
    fontSize: 18,
    marginBottom: '10px'
  },
  absenceContainer: {
    marginTop: '30px'
  },
  absenceText: {
    fontFamily: 'Lato Bold',
    marginBottom: '10px',
    fontSize: 18,
  },
  excuseContainer: {
    marginTop: '30px'
  },
  excuseText: {
    marginBottom: '10px'
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '100px'
  },
  signatureText: {
    width: '10%'
  },
  img: {
    width: '80%',
    marginLeft: '10%'
  },
  name: {
    fontFamily: 'Lato Bold'
  }
});

interface AbsencePdfDocumentProps {
  student: StudentInterface,
  from: moment.Moment,
  to: moment.Moment
}

// Create Document Component
const AbsencePdfDocument : FunctionComponent<AbsencePdfDocumentProps> = ({ student, from, to }) => {
  let birthday = student.birthday ? moment(student.birthday).format("DD.MM.YYYY") : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src={logo}
            style={styles.img}
          />
        </View>
        <View>
          <Text style={styles.attestationTitle}>Attestation</Text>
        </View>
        <View>
          <Text style={styles.contentText}>L’association Powercoders atteste que </Text>
          <Text style={styles.contentText}>Monsieur <Text style={styles.name}>{student.firstName} {student.lastName}</Text>​</Text>
          <Text style={styles.contentText}>né le {birthday}, domicilié à {student.addressCity},</Text>
        </View>
        <View style={styles.absenceContainer}>
          <Text style={styles.absenceText}>a suivi, du {from.format("DD MMMM")}​ au {to.format("DD MMMM")}, les cours intensifs de</Text>
          <Text style={styles.absenceText}>programmation informatique dans le cadre de la formation</Text>
          <Text style={styles.absenceText}>Powercoders à Lausanne.</Text>
        </View>
        <View style={styles.excuseContainer}>
          <Text style={styles.excuseText}>Plusieurs absences justifiées ont eu lieu le 21 et 22 novembre.</Text>
        </View>
        <View style={styles.signatureContainer}>
          <View style={styles.signatureText}>
            <Text>Coline</Text>
            <Text>Sauzet</Text>
            <Image 
              src={colineSignature}
            />      
          </View>
          <View style={styles.signatureText}>
            <Text>Magaly</Text>
            <Text>Mathys</Text>
            <Image 
              src={magalySignature}
            />        
          </View>
          <View style={styles.signatureText}>
            <Text>Sorin</Text>
            <Text>Paun</Text>
            <Image 
              src={sorinSignature}
            />         
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default AbsencePdfDocument;