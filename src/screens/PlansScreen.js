import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import BackgroundPagesOne from '../components/BackgroundPages/BackgroundPagesOne';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const plans = [
  { label: '1 Month', icon: 'star-outline', color: '#fde68a', price: 300, oldPrice: 600 },
  { label: '3 Month', icon: 'diamond-outline', color: '#67e8f9', price: 600, oldPrice: 900 },
  { label: '6 Month', icon: 'crown-outline', color: '#fbbf24', price: 900, oldPrice: 1200 },
  { label: '1 Year', icon: 'medal-outline', color: '#f472b6', price: 1100, oldPrice: 1400 },
];

export default function PlansScreen() {
  const navigation = useNavigation();   // ✅ FIX: hook inside component
  const [tab, setTab] = useState('Plans');

  return (
    <BackgroundPagesOne>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={{ marginTop: 38, marginHorizontal: 18 }}>
          
          {/* Profile title */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: '#fff',
                padding: 5,
                marginRight: 13,
              }}
            >
              <Icon name="arrow-left" color="#fff" size={22} />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', letterSpacing: 0.5 }}>
              Profile
            </Text>
          </View>

          {/* Avatar & Name */}
          <View style={{ alignItems: 'center', marginBottom: 14 }}>
            <View style={{
              borderWidth: 3,
              borderColor: '#fff',
              borderRadius: 48,
              padding: 3,
              marginBottom: 7,
            }}>
              <Image
                source={require('../assets/boy3.jpg')}
                style={{ width: 88, height: 88, borderRadius: 44 }}
              />
            </View>

            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19, marginBottom: 3 }}>
              Shoshanna
            </Text>
          </View>

          {/* Stats Row */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 18,
            marginHorizontal: 10,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 19 }}>40%</Text>
              <Text style={{ color: '#D1D5DB', fontSize: 14 }}>Reach</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 19 }}>20</Text>
              <Text style={{ color: '#D1D5DB', fontSize: 14 }}>Friends</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 19 }}>100</Text>
              <Text style={{ color: '#D1D5DB', fontSize: 14 }}>Coins</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(200,200,200,0.12)',
          borderRadius: 28,
          marginLeft: 22,
          marginRight: 22,
          marginBottom: 10,
          marginTop: 3,
        }}>

          {/* SAFETY TAB */}
          <TouchableOpacity
            onPress={() => {
              setTab('Safety');
              navigation.navigate('ProfileScreen');   // ✅ navigate back correctly
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 26,
            }}
          >
            <Text style={{
              fontSize: 17,
              color: tab === 'Safety' ? '#fff' : '#B0B0B0',
              fontWeight: tab === 'Safety' ? '600' : '500',
            }}>Safety</Text>
          </TouchableOpacity>

          {/* PLANS TAB */}
          <TouchableOpacity
            onPress={() => setTab('Plans')}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 26,
              backgroundColor: tab === 'Plans' ? '#C026D3' : 'transparent',
              shadowColor: '#A21CAF',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: tab === 'Plans' ? 0.3 : 0,
              shadowRadius: 8,
            }}
          >
            <Text style={{
              fontSize: 17,
              color: '#fff',
              fontWeight: '700',
            }}>Plans</Text>
          </TouchableOpacity>

        </View>

        {/* Plans List */}
        {tab === 'Plans' && (
          <View style={{ marginHorizontal: 18, marginTop: 6 }}>
            {plans.map(({ label, icon, color, price, oldPrice }) => (
              <View
                key={label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: color + '55',
                    borderRadius: 30,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Icon name={icon} size={26} color={color} />
                  </View>

                  <View style={{ marginLeft: 11 }}>
                    <Text style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 17,
                    }}>{label}</Text>

                    <Text style={{
                      color: '#EF4444',
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                      fontWeight: '600',
                    }}>₹{oldPrice}</Text>
                  </View>
                </View>

                <Text style={{
                  color: '#fff',
                  fontSize: 17,
                  fontWeight: '700',
                }}>₹{price}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Subscribe Button */}
        {tab === 'Plans' && (
          <TouchableOpacity
            style={{
              marginHorizontal: 22,
              marginTop: 22,
              borderRadius: 14,
              paddingVertical: 17,
              backgroundColor: '#C026D3',
              alignItems: 'center',
              shadowColor: '#9333EA',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.14,
              shadowRadius: 8,
              marginBottom: 24,
            }}
          >
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18,
            }}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </BackgroundPagesOne>
  );
}
