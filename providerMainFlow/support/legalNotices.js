import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, RowWrapper, Wrapper, Spacer, TinyTitle, ComponentWrapper, RegularText } from '../../../components';
import { appStyles, colors, sizes } from '../../../themes';
import Accordion from 'react-native-collapsible/Accordion';
import { Icon } from 'react-native-elements';
import { totalSize, height } from 'react-native-dimension';
class LegalNotices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          question: 'Legal Notice #1',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: 'Legal Notice #2',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: 'Legal Notice #3',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: 'Legal Notice #4',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: 'Legal Notice #5',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: "Legal Notice #6",
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        },
        {
          question: "Legal Notice #7",
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis risus sollicitudin.',
        }
      ],
      activeSections: [],
    };
  }
  _renderHeader = (content, index, isActive, sections) => {
    return (
      <Wrapper animation="fadeInUp">
        <Spacer height={sizes.baseMargin} />
        <RowWrapper >
          <Wrapper flex={9}>
            <TinyTitle>{content.question}</TinyTitle>
          </Wrapper>
          <Wrapper flex={1}>
            <Icon
              name={isActive ? "ios-chevron-up" : "ios-chevron-down"}
              type="ionicon"
              size={sizes.appIcons.small}
            />
          </Wrapper>
        </RowWrapper>
        <Spacer height={sizes.baseMargin} />
      </Wrapper>
    );
  };

  _renderContent = section => {
    return (
      <Wrapper>
        <ComponentWrapper >
          <RegularText style={[appStyles.textGray,{lineHeight:sizes.baseMargin}]}>{section.answer.repeat(5)}</RegularText>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
      </Wrapper>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render() {
    const { sections, activeSections } = this.state
    return (
      <MainWrapper>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          underlayColor={'transparent'}
          renderHeader={(content, index, isActive, sections) => this._renderHeader(content, index, isActive, sections)}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </MainWrapper>
    );
  }
}

export default LegalNotices;