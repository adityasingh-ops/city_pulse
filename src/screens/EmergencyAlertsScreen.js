import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const EMERGENCY_ALERTS = [
  {
    id: '1',
    type: 'critical',
    title: 'Weather Alert',
    message: 'Severe thunderstorm warning in effect until 10:00 PM',
    timestamp: '2 hours ago',
    icon: '⛈️',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Traffic Advisory',
    message: 'Major road closure on Highway 101 due to construction',
    timestamp: '5 hours ago',
    icon: '🚧',
  },
  {
    id: '3',
    type: 'info',
    title: 'Public Health Notice',
    message: 'Free flu vaccination clinic available at City Hall this weekend',
    timestamp: '1 day ago',
    icon: '💉',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Air Quality Alert',
    message: 'Elevated air pollution levels. Sensitive groups should limit outdoor activities',
    timestamp: '1 day ago',
    icon: '🌫️',
  },
  {
    id: '5',
    type: 'info',
    title: 'Community Event',
    message: 'Annual city parade scheduled for this Sunday. Road closures expected',
    timestamp: '2 days ago',
    icon: '🎉',
  },
  {
    id: '6',
    type: 'critical',
    title: 'Power Outage',
    message: 'Scheduled power maintenance in downtown area from 2 AM to 6 AM',
    timestamp: '3 days ago',
    icon: '⚡',
  },
];

const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '911', icon: '🚓' },
  { name: 'Fire Department', number: '911', icon: '🚒' },
  { name: 'Ambulance', number: '911', icon: '🚑' },
  { name: 'City Helpline', number: '311', icon: '📞' },
];

export default function EmergencyAlertsScreen() {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'critical':
        return {
          container: styles.criticalAlert,
          badge: styles.criticalBadge,
          badgeText: 'CRITICAL',
        };
      case 'warning':
        return {
          container: styles.warningAlert,
          badge: styles.warningBadge,
          badgeText: 'WARNING',
        };
      default:
        return {
          container: styles.infoAlert,
          badge: styles.infoBadge,
          badgeText: 'INFO',
        };
    }
  };

  const renderAlert = ({ item }) => {
    const alertStyle = getAlertStyle(item.type);

    return (
      <View style={[styles.alertCard, alertStyle.container]}>
        <View style={styles.alertHeader}>
          <Text style={styles.alertIcon}>{item.icon}</Text>
          <View style={styles.alertHeaderText}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <View style={alertStyle.badge}>
              <Text style={styles.badgeText}>{alertStyle.badgeText}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.alertMessage}>{item.message}</Text>
        <Text style={styles.alertTimestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  const renderEmergencyContact = (contact, index) => (
    <TouchableOpacity key={index} style={styles.contactCard}>
      <Text style={styles.contactIcon}>{contact.icon}</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactNumber}>{contact.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.emergencySection}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.contactsRow}>
            {EMERGENCY_CONTACTS.map((contact, index) =>
              renderEmergencyContact(contact, index)
            )}
          </View>
        </ScrollView>
      </View>

      <View style={styles.divider} />

      <View style={styles.alertsSection}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        <FlatList
          data={EMERGENCY_ALERTS}
          renderItem={renderAlert}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.alertsList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  emergencySection: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactsRow: {
    flexDirection: 'row',
  },
  contactCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  contactInfo: {
    alignItems: 'center',
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  divider: {
    height: 8,
    backgroundColor: '#e5e7eb',
  },
  alertsSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  alertsList: {
    paddingBottom: 16,
  },
  alertCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  criticalAlert: {
    backgroundColor: '#fee2e2',
    borderLeftColor: '#dc2626',
  },
  warningAlert: {
    backgroundColor: '#fef3c7',
    borderLeftColor: '#f59e0b',
  },
  infoAlert: {
    backgroundColor: '#dbeafe',
    borderLeftColor: '#3b82f6',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  alertHeaderText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  criticalBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  warningBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  infoBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
