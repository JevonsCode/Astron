import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onActionClick = this.onActionClick.bind(this);
    }

    state = {
        value: ""
    };

    onChange(value) {
        this.setState({
            value
        });
    }

    onActionClick() {
        console.log(`ss-> ${this.state.value}`);
    }

    onConfirm() {
        console.log(`ss-> ${this.state.value}`);
    }

    render() {
        return(
            <View>
                <AtSearchBar
                    value={this.state.value}
                    onChange={this.onChange}
                    onActionClick={this.onActionClick}
                />
            </View>
        );
    }
}

export default SearchBar;
