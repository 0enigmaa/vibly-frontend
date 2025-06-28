import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./updaPostModal.scss"
const UpdatePostModal = ({ visible, onCancel, onUpdate, initialValues }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        content: initialValues?.content || "",
      });

      // Eski rasmni ko‘rsatish (faqat 1 marta)
      if (initialValues?.postImage?.url) {
        setFileList([
          {
            uid: "-1",
            name: "old_image.jpg",
            status: "done",
            url: initialValues.postImage.url,
            thumbUrl: initialValues.postImage.url,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("content", values.content);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("postImage", fileList[0].originFileObj);
    }

    onUpdate(formData);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // faqat bitta fayl
  };

  const handleRemove = () => {
    setFileList([]);
  };

  return (
    <Modal
      title="Postni yangilash"
      open={visible}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          content: initialValues?.content || "",
        }}
      >
        <Form.Item
          name="content"
          label="Kontent"
          rules={[{ required: true, message: "Iltimos, matn kiriting" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Rasm">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
            maxCount={1}
            
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Rasm tanlash</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
