import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import useResults from "../hooks/useResults";

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' | '$$$
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={styles.backgroundStyle}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          navigation={navigation}
          results={filterResultsByPrice("$")}
          title='Cost Effective'
        />
        <ResultsList
          navigation={navigation}
          results={filterResultsByPrice("$$")}
          title='Bit Pricier'
        />
        <ResultsList
          navigation={navigation}
          results={filterResultsByPrice("$$$")}
          title='Big Spender'
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});

export default SearchScreen;
