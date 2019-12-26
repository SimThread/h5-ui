import Vue from 'vue';
import H5Doc from './H5Doc';
import Nav from './component/Nav';
import Block from './component/Block';
import Header from './component/Header';
import Footer from './component/Footer';
import Content from './component/Content';
import Container from './component/Container';
import Simulator from './component/Simulator';
import DemoBlock from './component/DemoBlock';
import DemoSection from './component/DemoSection';
import progress from 'nprogress';
import './style/nprogress.css';

const components = [
    Nav,
    Header,
    Footer,
    H5Doc,
    Block,
    Content,
    Container,
    Simulator,
    DemoBlock,
    DemoSection
];

export default function install() {
    components.map(Component => Vue.component(Component.name, Component));
}

export {
    Nav,
    Header,
    Footer,
    H5Doc,
    Block,
    Content,
    Container,
    Simulator,
    DemoBlock,
    DemoSection,
    progress
};
