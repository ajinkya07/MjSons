import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import { urls } from '@api/urls'
import IconPack from '@login/IconPack';

import ProductGridStyle from '@productGrid/ProductGridStyle';
import {
  getProductSubCategoryData,
  addProductToWishlist,
  addProductToCart,
  addRemoveProductFromCartByOne,
  getProductTotalCount
} from '@productGrid/ProductGridAction';

import { getTotalCartCount } from '@homepage/HomePageAction';
import { searchProducts } from '@search/SearchAction'

import { Toast, CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import { strings } from '@values/strings';
import Theme from '../../../values/Theme';

var userId = '';

class SearchProductGrid extends Component {
  constructor(props) {
    super(props);

    const from = this.props.route.params.fromCodeSearch;
    const searchCount = this.props.route.params.searchCount;

    this.state = {
      gridData: [],
      page: 0,
      productInventoryId: '',
      productInventoryId3: '',
      isProductImageModalVisibel: false,
      productImageToBeDisplayed: '',
      clickedLoadMore: false,
      selectedSortById: '6',
      fromCodeSearch: from,
      searchCount: searchCount,

      successProductGridVersion: 0,
      errorProductGridVersion: 0,
      successAddProductToWishlistVersion: 0,
      errorAddProductToWishlistVersion: 0,


      successAddProductToCartVersion: 0,
      errorAddProductToCartVersion: 0,

      successProductAddToCartPlusOneVersion: 0,
      errorProductAddToCartPlusOneVersion: 0,

      successTotalCartCountVersion: 0,
      errorTotalCartCountVersion: 0,

      productTotalcountSuccessVersion: 0,
      productTotalcountErrorVersion: 0,

      successSearchbyCategoryVersion: 0,
      errorSearchbyCategoryVersion: 0,

    };
    userId = global.userId;
  }

  componentDidMount = () => {
    const { searchByCategoryData } = this.props
    if (searchByCategoryData && searchByCategoryData.data.products && searchByCategoryData.data.products.length > 0) {
      this.setState({
        gridData: this.state.page === 0 ? searchByCategoryData.data.products
          : [...this.state.gridData, ...searchByCategoryData.data.products],
      });

      let id = searchByCategoryData.data.products[0].collection_id
      const countData = new FormData();
      countData.append('table', 'product_master');
      countData.append('mode_type', 'normal');
      countData.append('collection_id', id);
      countData.append('user_id', userId);
      countData.append('record', 10);
      countData.append('page_no', 0);
      countData.append('sort_by', '6');

      this.props.getProductTotalCount(countData)

    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successProductGridVersion,
      errorProductGridVersion,

      successAddProductToWishlistVersion,
      errorAddProductToWishlistVersion,
      successAddProductToCartVersion,
      errorAddProductToCartVersion,
      successProductAddToCartPlusOneVersion,
      errorProductAddToCartPlusOneVersion,
      successTotalCartCountVersion,
      errorTotalCartCountVersion,

      productTotalcountSuccessVersion,
      productTotalcountErrorVersion,
      successSearchbyCategoryVersion, errorSearchbyCategoryVersion,
    } = nextProps;
    let newState = null;


    if (successSearchbyCategoryVersion > prevState.successSearchbyCategoryVersion) {
      newState = {
        ...newState,
        successSearchbyCategoryVersion: nextProps.successSearchbyCategoryVersion,
      };
    }
    if (errorSearchbyCategoryVersion > prevState.errorSearchbyCategoryVersion) {
      newState = {
        ...newState,
        errorSearchbyCategoryVersion: nextProps.errorSearchbyCategoryVersion,
      };
    }
    if (successProductGridVersion > prevState.successProductGridVersion) {
      newState = {
        ...newState, successProductGridVersion: nextProps.successProductGridVersion,
      };
    }
    if (errorProductGridVersion > prevState.errorProductGridVersion) {
      newState = {
        ...newState, errorProductGridVersion: nextProps.errorProductGridVersion,
      };
    }

    if (successAddProductToWishlistVersion > prevState.successAddProductToWishlistVersion) {
      newState = {
        ...newState,
        successAddProductToWishlistVersion: nextProps.successAddProductToWishlistVersion,
      };
    }
    if (errorAddProductToWishlistVersion > prevState.errorAddProductToWishlistVersion) {
      newState = {
        ...newState,
        errorAddProductToWishlistVersion: nextProps.errorAddProductToWishlistVersion,
      };
    }

    if (successAddProductToCartVersion > prevState.successAddProductToCartVersion) {
      newState = {
        ...newState,
        successAddProductToCartVersion: nextProps.successAddProductToCartVersion,
      };
    }
    if (errorAddProductToCartVersion > prevState.errorAddProductToCartVersion) {
      newState = {
        ...newState,
        errorAddProductToCartVersion: nextProps.errorAddProductToCartVersion,
      };
    }

    if (successProductAddToCartPlusOneVersion > prevState.successProductAddToCartPlusOneVersion) {
      newState = {
        ...newState,
        successProductAddToCartPlusOneVersion:
          nextProps.successProductAddToCartPlusOneVersion,
      };
    }
    if (errorProductAddToCartPlusOneVersion > prevState.errorProductAddToCartPlusOneVersion) {
      newState = {
        ...newState,
        errorProductAddToCartPlusOneVersion:
          nextProps.errorProductAddToCartPlusOneVersion,
      };
    }

    if (successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      newState = {
        ...newState,
        successTotalCartCountVersion: nextProps.successTotalCartCountVersion,
      };
    }
    if (errorTotalCartCountVersion > prevState.errorTotalCartCountVersion) {
      newState = {
        ...newState,
        errorTotalCartCountVersion: nextProps.errorTotalCartCountVersion,
      };
    }

    if (productTotalcountSuccessVersion > prevState.productTotalcountSuccessVersion) {
      newState = {
        ...newState,
        productTotalcountSuccessVersion: nextProps.productTotalcountSuccessVersion,
      };
    }
    if (productTotalcountErrorVersion > prevState.productTotalcountErrorVersion) {
      newState = {
        ...newState,
        productTotalcountErrorVersion: nextProps.productTotalcountErrorVersion,
      };
    }

    return newState;
  }


  async componentDidUpdate(prevProps, prevState) {
    const {
      productGridData,
      addProductToWishlistData,
      addProductToCartData,
      productAddToCartPlusOneData,
      totalCartCountData,
      searchByCategoryData
    } = this.props;


    if (this.state.successSearchbyCategoryVersion > prevState.successSearchbyCategoryVersion) {
      this.setState({
        gridData: this.state.page === 0 ? searchByCategoryData.data.products
          : [...this.state.gridData, ...searchByCategoryData.data.products],
      });
    }
    if (this.state.errorSearchbyCategoryVersion > prevState.errorSearchbyCategoryVersion) {
      this.showToast(this.props.errorMsgSearch, 'danger')
    }


    if (this.state.errorProductGridVersion > prevState.errorProductGridVersion) {
      Toast.show({
        text: this.props.errorMsg
          ? this.props.errorMsg
          : strings.serverFailedMsg,
        color: 'warning',
        duration: 2500,
      });
      this.setState({ page: 0 });
    }


    if (this.state.successAddProductToWishlistVersion > prevState.successAddProductToWishlistVersion) {
      if (addProductToWishlistData.ack === '1') {
        Toast.show({
          text: addProductToWishlistData && addProductToWishlistData.msg,
          duration: 2500,
        });

        var dex2 = this.state.gridData.findIndex(
          item => item.product_inventory_id == this.state.productInventoryId3,
        );

        if (dex2 !== -1) {
          if (addProductToWishlistData.data && addProductToWishlistData.data.quantity !== null) {
            this.state.gridData[dex2].in_wishlist = parseInt(addProductToWishlistData.data.quantity);

            this.setState({ in_wishlist: addProductToWishlistData.data.quantity },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          } else if (addProductToWishlistData.data == null) {
            this.state.gridData[dex2].in_wishlist = parseInt(0);
            this.setState({ in_wishlist: '0' },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          }
        }

      }
    }

    if (this.state.errorAddProductToWishlistVersion > prevState.errorAddProductToWishlistVersion) {
      Toast.show({
        text: addProductToWishlistData && addProductToWishlistData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successAddProductToCartVersion > prevState.successAddProductToCartVersion) {
      if (addProductToCartData.ack === '1') {

        // let id = gridData && gridData[0].collection_id
        var dex = this.state.gridData.findIndex(
          item => item.product_inventory_id == this.state.productInventoryId2,
        );

        if (dex !== -1) {
          if (addProductToCartData.data && addProductToCartData.data.quantity !== null) {
            this.state.gridData[dex].quantity = parseInt(addProductToCartData.data.quantity);

            this.setState({ quantity: addProductToCartData.data.quantity },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          } else if (addProductToCartData.data == null) {
            this.state.gridData[dex].quantity = parseInt(0);
            this.setState({ quantity: '0' },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          }

          Toast.show({
            text: addProductToCartData && addProductToCartData.msg,
            duration: 2500,
          });

        }
      }
    }


    if (this.state.errorAddProductToCartVersion > prevState.errorAddProductToCartVersion) {
      Toast.show({
        text: addProductToCartData && addProductToCartData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successProductAddToCartPlusOneVersion > prevState.successProductAddToCartPlusOneVersion) {
      if (productAddToCartPlusOneData.ack === '1') {

        var Index = this.state.gridData.findIndex(
          item => item.product_inventory_id == this.state.productInventoryId,
        );

        if (Index !== -1) {
          if (productAddToCartPlusOneData.data && productAddToCartPlusOneData.data.quantity !== null) {
            this.state.gridData[Index].quantity = parseInt(
              productAddToCartPlusOneData.data.quantity,
            );

            this.setState({ quantity: productAddToCartPlusOneData.data.quantity },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          } else if (productAddToCartPlusOneData.data == null) {
            this.state.gridData[Index].quantity = parseInt(0);
            this.setState(
              {
                quantity: '0',
              },
              () => {
                console.log(JSON.stringify(this.state.gridData));
              },
            );
          }
        }

        Toast.show({
          text: productAddToCartPlusOneData && productAddToCartPlusOneData.msg,
          duration: 2500,
        });
      }
    }
    if (this.state.errorProductAddToCartPlusOneVersion > prevState.errorProductAddToCartPlusOneVersion) {
      Toast.show({
        text: productAddToCartPlusOneData && productAddToCartPlusOneData.msg,
        type: 'danger',
        duration: 2500,
      });
    }

    if (this.state.successTotalCartCountVersion > prevState.successTotalCartCountVersion) {
      global.totalCartCount = totalCartCountData.count;
    }

  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };

  //GRID UI HERE------------

  gridView = item => {
    const { gridItemDesign, border, iconView, } = ProductGridStyle;

    let url = urls.imageUrl + 'public/backend/product_images/thumb_image/'

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ProductDetails', { productItemDetails: item, })}>
        <View
          style={{
            backgroundColor: color.white,
            width: wp(46),
            marginHorizontal: hp(1),
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 2.2,
          }}
          activeOpacity={1}>
          <View style={gridItemDesign}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProductDetails', {
                  productItemDetails: item,
                })
              }
              onLongPress={() => this.showProductImageModal(item)}>
              <Image
                resizeMode={'cover'}
                style={{
                  height: hp(18),
                  width: wp(46),
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',

                }}
                defaultSource={IconPack.APP_LOGO}
                source={{ uri: url + item.image_name, }}
              />

            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 6,
                flex: 1,
              }}>
              <View style={{ flex: 1 }}>
                {item.key.map((key, i) => {
                  return (
                    <_Text
                      numberOfLines={1}
                      fsSmall
                      textColor={'#000000'}
                      style={{ ...Theme.ffLatoRegular12 }}>
                      {key.replace('_', ' ')}
                    </_Text>
                  );
                })}
              </View>

              <View style={{ flex: 1 }}>
                {item.value.map((value, j) => {
                  return (
                    <_Text
                      numberOfLines={1}
                      fsPrimary
                      //textColor={color.brandColor}
                      textColor={'#000000'}
                      style={{ ...Theme.ffLatoRegular12 }}>
                      {value ? value : '-'}
                    </_Text>
                  );
                })}
              </View>
            </View>

            <View style={border}></View>

            {item.quantity == 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() => this.addProductToWishlist(item)}>
                  {item.in_wishlist == 0 ?
                    <Image
                      source={require('../../../assets/Heart-Ring.png')}
                      style={{ height: hp(3.1), width: hp(3) }}
                      resizeMode="contain"
                    />
                    : item.in_wishlist == 1 ?
                      <Image
                        source={require('../../../assets/Heart.png')}
                        style={{ height: hp(3.1), width: hp(3) }}
                        resizeMode="contain"
                      />
                      : null}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addProductToCart(item)}>
                  <Image
                    source={require('../../../assets/Cart1.png')}
                    style={{ height: hp(3.1), width: hp(3) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            {item.quantity > 0 && (
              <View style={iconView}>
                <TouchableOpacity
                  onPress={() => this.removeProductFromCartByOne(item)}>
                  <Image
                    source={require('../../../assets/MinusBlock.png')}
                    style={{ height: hp(3), width: hp(3) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <_Text
                  numberOfLines={1}
                  textColor={color.brandColor}
                  fsMedium
                  fwHeading>
                  {item.quantity >= 1 ? item.quantity : item.in_cart}
                </_Text>

                <TouchableOpacity
                  onPress={() => this.addProductToCartPlusOne(item)}>
                  <Image
                    source={require('../../../assets/PlusBlock.png')}
                    style={{ height: hp(3), width: hp(3) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity >
    );
  };

  addProductToWishlist = async item => {
    const { gridData, page, selectedSortById } = this.state;

    let id = gridData && gridData[0].collection_id

    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_inventory_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    await this.props.addProductToWishlist(wishlistData);

    this.setState({
      productInventoryId3: item.product_inventory_id,
    });
  };

  addProductToCart = async item => {
    const { page, selectedSortById } = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cartData = new FormData();

    cartData.append('product_id', item.product_inventory_id);
    cartData.append('user_id', userId);
    cartData.append('cart_wish_table', 'cart');
    cartData.append('no_quantity', 1);
    cartData.append('product_inventory_table', 'product_master');

    await this.props.addProductToCart(cartData);

    const countData = new FormData();
    countData.append('user_id', userId);
    countData.append('table', 'cart');

    await this.props.getTotalCartCount(countData);

    this.setState({
      productInventoryId2: item.product_inventory_id,
    });
  };


  addProductToCartPlusOne = async item => {
    const { page, selectedSortById } = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart = new FormData();

    cart.append('product_id', item.product_inventory_id);
    cart.append('user_id', userId);
    cart.append('cart_wish_table', 'cart');
    cart.append('no_quantity', 1);
    cart.append('product_inventory_table', 'product_master');
    cart.append('plus', 1);

    await this.props.addRemoveProductFromCartByOne(cart);

    this.setState({
      productInventoryId: item.product_inventory_id,
    });
  };

  removeProductFromCartByOne = async item => {
    const { page, selectedSortById } = this.state;

    const type = Platform.OS === 'ios' ? 'ios' : 'android';

    let cart1 = new FormData();

    cart1.append('product_id', item.product_inventory_id);
    cart1.append('user_id', userId);
    cart1.append('cart_wish_table', 'cart');
    cart1.append('no_quantity', 1);
    cart1.append('product_inventory_table', 'product_master');
    cart1.append('plus', 0);

    await this.props.addRemoveProductFromCartByOne(cart1);

    if (item.quantity == 1) {
      const countData1 = new FormData();
      countData1.append('user_id', userId);
      countData1.append('table', 'cart');

      await this.props.getTotalCartCount(countData1);
    }

    this.setState({
      productInventoryId: item.product_inventory_id,
    });
  };

  showProductImageModal = item => {
    this.setState({
      productImageToBeDisplayed: item,
      isProductImageModalVisibel: true,
    });
  };

  showNoDataFound = message => {
    return (
      <View
        style={{
          height: hp(60),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../assets/gif/noData.gif')}
          style={{ height: hp(20), width: hp(20) }}
          resizeMode="cover"
        />
        <_Text style={{ paddingTop: 5 }}>{message}</_Text>
      </View>
    );
  };

  seperator = () => {
    return (
      <View
        style={{
          borderBottomColor: color.primaryGray,
          borderBottomWidth: 0.5,
          width: wp(95),
        }}
      />
    );
  };

  LoadMoreData = () => {
    const { productTotalcount, isFetchingSearch } = this.props
    const { gridData, searchCount, } = this.state

    if (gridData.length !== searchCount && gridData.length < searchCount && !isFetchingSearch) {
      this.setState({
        page: this.state.page + 1,
      },
        () => this.LoadRandomData(),
      );
    }
    else if (gridData.length === searchCount || gridData.length > searchCount) {
      Toast.show({
        text: 'No more products to show',
      })
    }
  }


  LoadRandomData = () => {
    const { gridData, page } = this.state;

    const { allParameterData, searchPayload } = this.props;

    let accessCheck = allParameterData && allParameterData.access_check

    let id = gridData && gridData[0].collection_id


    if (accessCheck == '1') {
      const s = new FormData()
      s.append('table', 'product_master')
      s.append('mode_type', 'filter_data')
      s.append('user_id', userId)
      s.append('record', 10)
      s.append('page_no', page)
      s.append('collection_ids', searchPayload.collection_ids.toString())
      s.append('sort_by', 2)
      s.append('min_gross_weight', searchPayload.min_gross_weight ? searchPayload.min_gross_weight : '')
      s.append('max_gross_weight', searchPayload.max_gross_weight ? searchPayload.max_gross_weight : '')
      s.append('min_net_weight', searchPayload.min_net_weight ? searchPayload.min_net_weight : '')
      s.append('max_net_weight', searchPayload.max_net_weight ? searchPayload.max_net_weight : '')
      s.append('product_status', searchPayload.product_status)
      s.append('melting_id  ', searchPayload.melting_id.toString())
      s.append('created_date_from', searchPayload.created_date_from ? searchPayload.created_date_from : '')
      s.append('created_date_to', searchPayload.created_date_to ? searchPayload.created_date_to : '')

      this.props.searchProducts(s)

    }
    else {
      alert('Your access to full category has been expired. Please contact administrator to get access.')
    }
  };


  onTextChanged = (inputKey, value) => {
    this.setState({
      [inputKey]: value,
    });
  };



  render() {
    const { gridData, productImageToBeDisplayed, isProductImageModalVisibel, fromCodeSearch } = this.state;

    let imageUrl = urls.imageUrl + 'public/backend/product_images/zoom_image/'

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f3fcf9' }}>
        <_CustomHeader
          Title={`(${gridData.length.toString()})` + ' ' + `${!fromCodeSearch ? 'Advanced Search' : ' Search By Code'}`}
          RightBtnIcon1={require('../../../assets/image/BlueIcons/Search-White.png')}
          RightBtnIcon2={require('../../../assets/shopping-cart.png')}
          RightBtnPressOne={() => this.props.navigation.navigate('SearchScreen')}
          RightBtnPressTwo={() => this.props.navigation.navigate('CartContainer', { fromProductGrid: true })}
          rightIconHeight2={hp(3.5)}
          LeftBtnPress={() => this.props.navigation.goBack()}
        />


        {gridData && (
          <FlatList
            data={gridData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View key={'s' + index} style={{ marginVertical: hp(1) }}>
                {this.gridView(item)}
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: hp(1) }}
            onEndReachedThreshold={0.4}
            onEndReached={() => this.LoadMoreData()}

          />
        )}

        {this.props.isFetchingSearch && this.renderLoader()}



        {/* LONG PRESS IMAGE MODAL */}

        {this.state.isProductImageModalVisibel && (
          <View>
            <Modal
              style={{ justifyContent: 'center' }}
              isVisible={this.state.isProductImageModalVisibel}
              onRequestClose={() =>
                this.setState({ isProductImageModalVisibel: false })
              }
              onBackdropPress={() =>
                this.setState({ isProductImageModalVisibel: false })
              }
              onBackButtonPress={() =>
                this.setState({ isProductImageModalVisibel: false })
              }>
              <SafeAreaView>
                <View
                  style={{
                    height: hp(42),
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <_Text fsMedium style={{ marginTop: hp(0.5) }}>
                    Code: {productImageToBeDisplayed.collection_sku_code}
                  </_Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      width: wp(90),
                    }}
                  />
                  <Image
                    source={{ uri: imageUrl + productImageToBeDisplayed.image_name }}
                    defaultSource={IconPack.APP_LOGO}
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5),
                    }}
                  />
                  {/* 
                   <FastImage
                    style={{
                      height: hp(34),
                      width: wp(90),
                      marginTop: hp(0.5),
                    }}
                    source={{
                      uri: imageUrl + productImageToBeDisplayed.image_name,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  /> */}
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#808080',
  },
  toText: {
    fontSize: 16,
    color: '#808080',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterImg: {
    width: 20,
    height: 20,
    marginRight: 15,
    marginTop: 2,
  },
  grossWeightContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  leftGrossWeight: {
    backgroundColor: '#D3D3D3',
    flex: 1,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightGrossWeight: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  sliderContainer: {
    flexDirection: 'row',
  },
  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  filterTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 46,
    alignItems: 'center',
    backgroundColor: '#11255a',
  },
  grosswt: {
    borderWidth: 1,
    borderRightColor: '#fbcb84',
    height: '90%',
  },
});

function mapStateToProps(state) {
  return {
    isFetchingSearch: state.searchReducer.isFetchingSearch,
    errorSearch: state.searchReducer.errorSearch,
    errorMsgSearch: state.searchReducer.errorMsgSearch,
    successSearchbyCategoryVersion: state.searchReducer.successSearchbyCategoryVersion,
    errorSearchbyCategoryVersion: state.searchReducer.errorSearchbyCategoryVersion,
    searchByCategoryData: state.searchReducer.searchByCategoryData,

    isFetching: state.productGridReducer.isFetching,
    error: state.productGridReducer.error,
    errorMsg: state.productGridReducer.errorMsg,
    successProductGridVersion: state.productGridReducer.successProductGridVersion,
    errorProductGridVersion: state.productGridReducer.errorProductGridVersion,
    productGridData: state.productGridReducer.productGridData,

    successAddProductToWishlistVersion: state.productGridReducer.successAddProductToWishlistVersion,
    errorAddProductToWishlistVersion: state.productGridReducer.errorAddProductToWishlistVersion,
    addProductToWishlistData: state.productGridReducer.addProductToWishlistData,

    successAddProductToCartVersion: state.productGridReducer.successAddProductToCartVersion,
    errorAddProductToCartVersion: state.productGridReducer.errorAddProductToCartVersion,
    addProductToCartData: state.productGridReducer.addProductToCartData,

    successProductAddToCartPlusOneVersion: state.productGridReducer.successProductAddToCartPlusOneVersion,
    errorProductAddToCartPlusOneVersion: state.productGridReducer.errorProductAddToCartPlusOneVersion,
    productAddToCartPlusOneData: state.productGridReducer.productAddToCartPlusOneData,

    successTotalCartCountVersion: state.homePageReducer.successTotalCartCountVersion,
    errorTotalCartCountVersion: state.homePageReducer.errorTotalCartCountVersion,
    totalCartCountData: state.homePageReducer.totalCartCountData,

    allParameterData: state.homePageReducer.allParameterData,
    successAllParameterVersion: state.homePageReducer.successAllParameterVersion,
    errorAllParamaterVersion: state.homePageReducer.errorAllParamaterVersion,

    productTotalcount: state.productGridReducer.productTotalcount,
    productTotalcountSuccessVersion: state.productGridReducer.productTotalcountSuccessVersion,
    productTotalcountErrorVersion: state.productGridReducer.productTotalcountErrorVersion,

    searchPayload: state.searchReducer.searchPayload,

  }
}

export default connect(
  mapStateToProps, {
  getProductSubCategoryData,
  addProductToWishlist,
  addProductToCart,
  addRemoveProductFromCartByOne,
  getTotalCartCount,
  getProductTotalCount,
  searchProducts
}
)(SearchProductGrid);
