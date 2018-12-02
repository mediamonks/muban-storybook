import { mapGetters } from 'vuex';
import Header from '../../component/Header';
import FilterBar from '../../component/FilterBar';
import DeviceEmulation from '../../component/DeviceEmulation';
import ContentContainer from '../../component/ContentContainer';
import InfoPanel from '../../component/InfoPanel';
import { StoryNamespace } from '../../store/module/story';

export default {
  name: 'HomePage',
  components: {
    Header,
    FilterBar,
    DeviceEmulation,
    ContentContainer,
    InfoPanel,
  },
  computed: {
    ...mapGetters(StoryNamespace, ['panelInfo']),
  }
};
