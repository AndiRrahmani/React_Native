import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Image
} from "react-native";

class FetchChallenge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
      refreshing: false,
      error: null,
      query: "",
      expanded: {}
    };

    // animated values per post id
    this.animated = {};
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      this.setState({ posts: json, loading: false, refreshing: false }, this.animatePosts);
    } catch (error) {
      console.log("Error fetching posts;", error);
      this.setState({ error: error.message || "Error", loading: false, refreshing: false });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, this.loadPosts);
  };

  // Use a placeholder avatar service. pravatar returns small avatar images.
  avatarForUser = (userId) => {
    // Keep ids in a safe range for the service
    const id = ((userId - 1) % 70) + 1;
    return { uri: `https://i.pravatar.cc/150?img=${id}` };
  };

  animatePosts = () => {
    const { posts } = this.state;
    const animations = posts.map((p, i) => {
      if (!this.animated[p.id]) {
        this.animated[p.id] = new Animated.Value(0);
      }

      return Animated.timing(this.animated[p.id], {
        toValue: 1,
        duration: 350,
        delay: i * 45,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      });
    });

    Animated.stagger(30, animations).start();
  };

  toggleExpand = (id) => {
    this.setState((s) => ({ expanded: { ...s.expanded, [id]: !s.expanded[id] } }));
  };

  renderHeader = () => {
    return (
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Latest Posts</Text>
        <Text style={styles.headerSubtitle}>An elegant, modern list with animations</Text>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search titles..."
            placeholderTextColor="#99a"
            value={this.state.query}
            onChangeText={(text) => this.setState({ query: text })}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
      </View>
    );
  };

  filteredPosts = () => {
    const { posts, query } = this.state;
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  };

  renderItem = ({ item, index }) => {
    if (!this.animated[item.id]) this.animated[item.id] = new Animated.Value(0);

    const animStyle = {
      opacity: this.animated[item.id],
      transform: [
        {
          translateY: this.animated[item.id].interpolate({
            inputRange: [0, 1],
            outputRange: [8, 0]
          })
        }
      ]
    };

    const isExpanded = !!this.state.expanded[item.id];

    return (
      <Animated.View style={[styles.postCard, animStyle]}>
        <View style={styles.cardAccent} />
        <TouchableOpacity activeOpacity={0.86} onPress={() => this.toggleExpand(item.id)}>
          <View style={styles.cardRow}>
            <View style={styles.avatar}>
              <Image
                source={this.avatarForUser(item.userId)}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={() => { /* silent fallback to initials */ }}
              />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.rowTop}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.lengthPill}>{item.body.length} ch</Text>
              </View>

              <Text style={[styles.body, isExpanded ? styles.bodyExpanded : null]} numberOfLines={isExpanded ? 20 : 3}>
                {item.body}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.footerBadge}>Post #{item.id}</Text>
                <Text style={styles.footerMeta}>User {item.userId}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>No posts found</Text>
        <Text style={styles.emptySubtitle}>Try a different search or refresh</Text>
      </View>
    );
  };

  render() {
    const { loading, error, refreshing } = this.state;
    const data = this.filteredPosts();

    if (loading && !refreshing) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#2db7ff" />
          <Text style={{ marginTop: 10, color: '#d7eefb' }}>Loading posts...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={{ color: "#ff8a8a" }}>Failed to load posts: {error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmpty}
          contentContainerStyle={{ paddingBottom: 24 }}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1724",
    padding: 14
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerWrap: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.07, shadowOffset: { width: 0, height: 8 }, shadowRadius: 12 },
      android: { elevation: 2 }
    })
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#f7fbff"
  },
  headerSubtitle: {
    color: "#9fb0c8",
    marginTop: 6,
    marginBottom: 10
  },
  searchRow: {
    marginTop: 8
  },
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "#eaf2ff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 1
  },
  postCard: {
    marginBottom: 14,
    borderRadius: 14,
    padding: 12,
    overflow: "hidden",
    backgroundColor: "#07101a",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.12, shadowOffset: { width: 0, height: 12 }, shadowRadius: 16 },
      android: { elevation: 4 }
    })
  },
  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: "#2db7ff",
    opacity: 0.95
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0b2030",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    overflow: 'hidden'
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0b2030'
  },
  avatarText: {
    color: "#bfe9ff",
    fontWeight: "700"
  },
  cardBody: {
    flex: 1,
    paddingLeft: 6
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#eaf6ff",
    marginBottom: 6
  },
  lengthPill: {
    backgroundColor: "rgba(45,183,255,0.12)",
    color: "#9ee6ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12
  },
  body: {
    fontSize: 14,
    color: "#c8dbe8",
    lineHeight: 20
  },
  bodyExpanded: {
    color: "#eef8ff"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  footerBadge: {
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#9fb7ca",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "700",
    fontSize: 12
  },
  footerMeta: {
    color: "#89a4b8",
    fontSize: 12
  },
  emptyWrap: {
    marginTop: 40,
    alignItems: "center"
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#eaf6ff",
    marginBottom: 6
  },
  emptySubtitle: {
    color: "#7f98aa"
  }
});

export default FetchChallenge;
