import React from "react"
import { Button as AntdButton } from "antd"
import { SaveOutlined, UploadOutlined } from "@ant-design/icons"

export interface SmartButtonProps {
    mode: "submit" | "update"
    loading?: boolean
    dirtyCount?: number
    onClick?: () => void
    disabled?: boolean
    label?: string
    icon?: React.ReactNode
    type?: "primary" | "default" | "link" | "text";
}

export const SmartButton: React.FC<SmartButtonProps> = ({
    mode,
    loading = false,
    dirtyCount = 0,
    onClick,
    disabled,
    label,
    icon,
    type
}) => {
    const isUpdate = mode === "update"
    const isSubmit = mode === "submit"

    const defaultLabel = isSubmit
        ? loading
            ? "Submitting..."
            : "Submit"
        : loading
            ? "Saving..."
            : dirtyCount > 0
                ? `Save (${dirtyCount} changes)`
                : "Save"

    const defaultIcon = isSubmit ? <UploadOutlined /> : <SaveOutlined />

    return (
        <AntdButton
            type={type ?? "primary"}
            icon={icon ?? defaultIcon}
            loading={loading}
            disabled={disabled || (isUpdate && dirtyCount === 0)}
            onClick={onClick}
        >
            {label || defaultLabel}
        </AntdButton>
    )
}
