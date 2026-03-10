import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, Paragraph, List } from 'react-native-paper';

const FinancingCalculatorScreen = () => {
  const [carPrice, setCarPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('60');
  const [interestRate, setInterestRate] = useState('5.5');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculatePayment = () => {
    const principal = parseFloat(carPrice) - parseFloat(downPayment || 0);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm);

    if (principal > 0 && rate > 0 && term > 0) {
      const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const total = payment * term;
      const interest = total - principal;

      setMonthlyPayment(payment);
      setTotalPayment(total);
      setTotalInterest(interest);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Financing Calculator</Title>
          <Paragraph>Get an estimate of your monthly car payments</Paragraph>

          <TextInput
            label="Car Price ($)"
            value={carPrice}
            onChangeText={setCarPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Down Payment ($)"
            value={downPayment}
            onChangeText={setDownPayment}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Loan Term (months)"
            value={loanTerm}
            onChangeText={setLoanTerm}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Interest Rate (%)"
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
            style={styles.input}
          />

          <Button mode="contained" onPress={calculatePayment} style={styles.button}>
            Calculate Payment
          </Button>
        </Card.Content>
      </Card>

      {monthlyPayment > 0 && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Title>Payment Summary</Title>
            <List.Item
              title="Monthly Payment"
              description={`$${monthlyPayment.toFixed(2)}`}
              left={props => <List.Icon {...props} icon="cash" />}
            />
            <List.Item
              title="Total Payment"
              description={`$${totalPayment.toFixed(2)}`}
              left={props => <List.Icon {...props} icon="calculator" />}
            />
            <List.Item
              title="Total Interest"
              description={`$${totalInterest.toFixed(2)}`}
              left={props => <List.Icon {...props} icon="percent" />}
            />
            <Paragraph style={styles.disclaimer}>
              *This is an estimate. Actual payments may vary based on credit score, location, and other factors.
            </Paragraph>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  resultCard: {
    marginBottom: 20,
  },
  disclaimer: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default FinancingCalculatorScreen;