import {connect} from 'react-redux'
import AppWebView from '../components/AppWebView'

const mapStateToProps = (state) => ({
    url: "https://github.com/mochixuan/OneArtical"
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(AppWebView)
