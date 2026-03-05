import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, List, Avatar } from 'react-native-paper';

const AboutScreen = () => {
  const team = [
    { name: 'John Smith', role: 'General Manager', avatar: 'https://via.placeholder.com/100x100?text=JS' },
    { name: 'Sarah Johnson', role: 'Sales Manager', avatar: 'https://via.placeholder.com/100x100?text=SJ' },
    { name: 'Mike Davis', role: 'Service Manager', avatar: 'https://via.placeholder.com/100x100?text=MD' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>About Elite Auto Dealership</Title>
          <Paragraph style={styles.description}>
            For over 20 years, Elite Auto Dealership has been the premier destination for quality vehicles
            in the region. We pride ourselves on offering an extensive selection of new and certified
            pre-owned vehicles, exceptional customer service, and competitive financing options.
          </Paragraph>
          <Paragraph style={styles.description}>
            Our commitment to excellence extends beyond sales. We provide comprehensive service and
            maintenance for all makes and models, ensuring your vehicle stays in top condition for years to come.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Why Choose Us?</Title>
          <List.Item
            title="Extensive Inventory"
            description="Over 200 vehicles in stock, from economy to luxury"
            left={props => <List.Icon {...props} icon="car-multiple" />}
          />
          <List.Item
            title="Certified Pre-Owned"
            description="Rigorous inspection and warranty on all used vehicles"
            left={props => <List.Icon {...props} icon="shield-check" />}
          />
          <List.Item
            title="Competitive Financing"
            description="Work with multiple lenders for the best rates"
            left={props => <List.Icon {...props} icon="cash" />}
          />
          <List.Item
            title="Expert Service"
            description="ASE-certified technicians and state-of-the-art facility"
            left={props => <List.Icon {...props} icon="wrench" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Meet Our Team</Title>
          {team.map((member, index) => (
            <List.Item
              key={index}
              title={member.name}
              description={member.role}
              left={props => <Avatar.Image {...props} size={50} source={{ uri: member.avatar }} />}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Our Commitment</Title>
          <Paragraph>
            At Elite Auto Dealership, customer satisfaction is our top priority. We believe in building
            long-term relationships with our clients through transparency, integrity, and outstanding service.
            Your trust and loyalty drive everything we do.
          </Paragraph>
        </Card.Content>
      </Card>
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});

export default AboutScreen;