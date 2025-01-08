import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TermsConditionsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Condition & Attending</Text>
        <Text style={styles.paragraph}>
          At enim hic etiam dolore. Dulce amarum, leve asperum, prope longe,
          stare movere, quadratum rotundum. At certe gravius. Nullus est igitur
          cuiusquam dies natalis. Paulum, cum regem Persem captum adduceret,
          eodem flumine invectio?
        </Text>
        <Text style={styles.paragraph}>
          Quare hoc videndum est, possitne nobis hoc ratio philosophorum dare.
          Sed finge non solum callidum eum, qui aliquid improbe faciat, verum
          etiam prae potentem, ut M. Est autem officium, quod ita factum est, ut
          eius facti probabilis ratio reddi possit.
        </Text>

        <Text style={styles.sectionTitle}>Terms & Use</Text>
        <Text style={styles.paragraph}>
          Ut proverbia non nulla veriora sint quam vestra dogmata. Tamen
          aberramus a proposito, et, ne longius, prorsus, inquam, Piso, si ista
          mala sunt, placet. Omnes enim iucundum motum, quo sensus hilaretur.
          Cum id fugium, re eadem defendunt, quae Peripatetici, verba. Quibusnam
          praeteritis? Portenta haec esse dicit, quidem hactenus; Si id dicis,
          vicimus. Qui ita affectus, beatum esse numquam probabis; Igitur neque
          stultorum quisquam beatus neque sapientium non beatus.
        </Text>
        <Text style={styles.paragraph}>
          Dicam, inquam, et quidem discendi causa magis, quam quo te aut
          Epicurum reprehensum velim. Dolor ergo, id est summum malum, metuetor
          semper, etiamsi non ader.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 14,
    color: '#4F4F4F',
    lineHeight: 20,
    marginBottom: 12,
  },
});

export default TermsConditionsScreen;