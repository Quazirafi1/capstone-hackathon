"use client";

import React from 'react';
import clipboardCopy from 'clipboard-copy';
import { Button } from './button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    stakeholder_group: string;
    text: string;
    shrinkWrap?: boolean;
}

export function CopyLinkToQuestionnaireButton({ stakeholder_group, text, shrinkWrap, className, ...rest }: ButtonProps) {
    const handleClick = () => {
        const currentPath = window.location.href;
        console.log(currentPath)
        const parentPath = currentPath.split('/').slice(0, -1).join('/');
        clipboardCopy(`${parentPath}/questionnaire/${stakeholder_group}`);
        alert('Copied to clipboard!');
      };

    return <Button text={text} shrinkWrap={shrinkWrap} className={className} {...rest} onClick={
        handleClick
    } />
}